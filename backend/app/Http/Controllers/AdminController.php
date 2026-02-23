<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class AdminController extends Controller{
    // -----------------------------
    // EVENTS
    // -----------------------------
    // List all events
    public function events()
    {
        $events = Event::orderBy('id', 'DESC')->paginate(10);
        return view('admin.event', compact('events'));
    }
    // Show create event form
    public function add_event(){
        return view('admin.event-add');
    }
    // Save new event
    public function add_event_save(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'required|string|max:255',
            'event_date' => 'required|date',
            'feature_image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $event = new Event();
            $event->title = $request->title;
            $event->slug = Str::slug($request->title);
            $event->description = $request->description;
            $event->venue = $request->venue;
            $event->event_date = $request->event_date;

            // Handle feature image
            if ($request->hasFile('feature_image')) {
                $image = $request->file('feature_image');
                $file_ext = $image->extension();
                $file_name = Carbon::now()->timestamp . '.' . $file_ext;
                $this->GenerateEventImage($image, $file_name);
                $event->feature_image = $file_name;
            }

            $event->save();

            /*
            |--------------------------------------------------------------------------
            | SAVE GALLERY IMAGES
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('images')) {

                $galleryPath = public_path('uploads/event_images');

                if (!File::exists($galleryPath)) {
                    File::makeDirectory($galleryPath, 0755, true);
                }

                foreach ($request->file('images') as $galleryImage) {
                    $file_name = time().'_'.$galleryImage->getClientOriginalName();
                    $galleryImage->move($galleryPath, $file_name);

                    EventImage::create([
                        'event_id' => $event->id,
                        'image_path' => $file_name,
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route('admin.events')
                ->with('status', 'Event has been added successfully!');

        } catch (\Exception $e) {

            DB::rollBack();

            return back()->with('error', 'Something went wrong: '.$e->getMessage());
        }
    }

    // Show edit event form
    public function edit_event($id){
        $event = Event::with('eventImages')->findOrFail($id);
        return view('admin.event-edit', compact('event'));
    }

    // Update existing event
    public function update_event(Request $request){
        $request->validate([
            'id' => 'required|exists:events,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'feature_image' => 'nullable|mimes:jpg,jpeg,png|max:2048',
            'images.*' => 'nullable|mimes:jpg,jpeg,png|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $event = Event::findOrFail($request->id);
            $event->title = $request->title;
            $event->slug = Str::slug($request->title);
            $event->description = $request->description;
            $event->venue = $request->venue;
            $event->event_date = $request->event_date;

            // Replace feature image if new one uploaded
            if ($request->hasFile('feature_image')) {
                if ($event->feature_image && File::exists(public_path('uploads/events/' . $event->feature_image))) {
                    File::delete(public_path('uploads/events/' . $event->feature_image));
                }
                $image = $request->file('feature_image');
                $file_ext = $image->extension();
                $file_name = Carbon::now()->timestamp . '.' . $file_ext;
                $this->GenerateEventImage($image, $file_name);
                $event->feature_image = $file_name;
            }

            $event->save();

            // Append new gallery images if uploaded
            if ($request->hasFile('images')) {
                $galleryPath = public_path('uploads/event_images');
                if (!File::exists($galleryPath)) {
                    File::makeDirectory($galleryPath, 0755, true);
                }
                foreach ($request->file('images') as $galleryImage) {
                    $file_name = time().'_'.$galleryImage->getClientOriginalName();
                    $galleryImage->move($galleryPath, $file_name);
                    EventImage::create([
                        'event_id' => $event->id,
                        'image_path' => $file_name,
                    ]);
                }
            }

            DB::commit();
            return redirect()->route('admin.events')->with('status', 'Event has been updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update event: '.$e->getMessage());
        }
    }

    // Delete event
    public function delete_event($id){
        DB::beginTransaction();
        try {
            $event = Event::findOrFail($id);
            // 1. Delete feature image
            if ($event->feature_image) {
                // Extract just the filename from the URL (remove domain + path prefix)
                $filename = basename($event->feature_image);  // works even if it's already just a filename
                $featurePath = public_path('uploads/events/' . $filename);
                if (File::exists($featurePath)) {
                    File::delete($featurePath);
                }
            }

            // 2. Delete gallery images
            $galleryImages = EventImage::where('event_id', $event->id)->get();
            foreach ($galleryImages as $galleryImage) {
                // Same fix: extract filename only
                $galleryFilename = basename($galleryImage->image_path);
                $imagePath = public_path('uploads/event_images/' . $galleryFilename);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
                $galleryImage->delete(); // delete DB record
            }

            // 3. Delete the event itself
            $event->delete();
            DB::commit();
            return redirect()->route('admin.events')
                ->with('status', 'Event and all associated images deleted successfully!');
        } 
        catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.events')
                ->with('error', 'Failed to delete event: ' . $e->getMessage());
        }
    }

    // Generate feature image (resized thumbnail)
    public function GenerateEventImage($image, $image_name){
        $destination_path = public_path('uploads/events');
        if (!File::exists($destination_path)) {
            File::makeDirectory($destination_path, 0755, true);
        }
        $manager = new ImageManager(new Driver());
        $img = $manager->read($image->path());
        $img->scale(width: 800);
        $img->save($destination_path . '/' . $image_name);
    }
}