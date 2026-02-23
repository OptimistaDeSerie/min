<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| SECURE ADMIN AREA
  auth middleware is built-in by Laravel. It checks: Is the user logged in?
  If NO → automatically redirects to /login. If YES → allows access
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return view('admin.index');
    });

    Route::get('/secure', function () {
        return view('admin.index');
    });

    Route::get('/events', [AdminController::class, 'events'])->name('admin.events');
    Route::get('/event/add', [AdminController::class, 'add_event'])->name('admin.event.add');
    Route::post('/event/save', [AdminController::class, 'add_event_save'])->name('admin.event.save');
    Route::get('/event/{id}/edit', [AdminController::class, 'edit_event'])->name('admin.event.edit');
    Route::post('/event/edit', [AdminController::class, 'update_event'])->name('admin.event.update');
    Route::delete('/event/delete/{id}', [AdminController::class, 'delete_event'])->name('admin.event.delete');

    // Logout
    Route::get('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/login');
    })->name('logout');
});
require __DIR__.'/auth.php';
