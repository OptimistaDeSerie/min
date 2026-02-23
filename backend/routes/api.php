<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PartnershipController;
use App\Http\Controllers\Api\ContactController;

// Test endpoint
Route::get('/ping', function () {
    return response()->json([
        'status' => 'Laravel API working'
    ]);
});
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{slug}', [EventController::class, 'view']);
Route::post('/partnership', [PartnershipController::class, 'submit_form']);
Route::post('/contact', [ContactController::class, 'submit_contact_form']);