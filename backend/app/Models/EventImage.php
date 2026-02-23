<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventImage extends Model
{
    protected $fillable = ['event_id', 'image_path', 'caption'];
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function getImagePathAttribute($value)
    {
        if (!$value) {
            return null;
        }
        $path = ltrim($value, '/'); // remove leading slash if any
        return asset("uploads/event_images/{$path}");
    }
}
