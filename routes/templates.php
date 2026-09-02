<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/templates', function () {
        return Inertia::render('templates/index');
    })->name('templates');
});