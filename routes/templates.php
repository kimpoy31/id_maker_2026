<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\ImageUploadController;

Route::middleware('auth')->group(function () {
    Route::get('/templates', [TemplateController::class, 'index'])->name('templates');
    Route::post('/templates', [TemplateController::class, 'store'])->name('templates.store');
    Route::get('/templates/{template}', [TemplateController::class, 'show'])->name('templates.show');
    Route::put('/templates/{template}', [TemplateController::class, 'update'])->name('templates.update');
    Route::delete('/templates/{template}', [TemplateController::class, 'destroy'])->name('templates.destroy');
});

Route::middleware('auth')->post('/upload', [ImageUploadController::class, 'store'])->name('image.upload');