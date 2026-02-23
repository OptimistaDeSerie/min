<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        return Event::with('images')
            ->latest()
            ->get();
    }

    public function view($slug)
    {
        return Event::with('images')
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
