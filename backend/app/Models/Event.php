<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'venue', 'event_date', 'feature_image'];
    public function images()
    {
        return $this->hasMany(EventImage::class);
    }

    public function getFeatureImageAttribute($value)
    {
        if (!$value) {
            return null;
        }
        $path = ltrim($value, '/'); // remove leading slash if any
        return asset("uploads/events/{$path}");
    }

    public function eventImages(){
        return $this->hasMany(EventImage::class, 'event_id', 'id');
    }
}
