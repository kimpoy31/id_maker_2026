<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TemplateController;

Route::middleware('auth')->group(function () {
    Route::get('/templates', [TemplateController::class, 'index'])->name('templates');
    Route::post('/templates', [TemplateController::class, 'store'])->name('templates.store');
});