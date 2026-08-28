<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return to_route('login');
    })->name('home');

    Route::get('/login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

require __DIR__.'/templates.php';
require __DIR__.'/users.php';

// Test route for canvas editor
Route::get('/editor/templates/create', function () {
    return Inertia::render('editor/templates/create');
});