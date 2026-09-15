<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/users', function () {
        return Inertia::render('users/index');
    })->name('users');
});