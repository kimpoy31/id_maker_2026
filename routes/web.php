<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return to_route('login');
    })->name('home');

    Route::get('/login', function () {
        return Inertia::render('login');
    })->name('login');
});

// Route::middleware('auth')->group(function () {
//     Route::inertia('/dashboard', 'dashboard')->name('dashboard');
// });