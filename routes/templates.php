<?php

use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/templates/{name}', [\App\Http\Controllers\TemplateController::class, 'show'])->name('templates.show');
    Route::post('/templates', [\App\Http\Controllers\TemplateController::class, 'store'])->name('templates.store');
});
