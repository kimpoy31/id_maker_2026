<?php

use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/templates', [\App\Http\Controllers\TemplateController::class, 'index'])->name('templates.index');
    Route::get('/templates/{name}', [\App\Http\Controllers\TemplateController::class, 'show'])->name('templates.show');
    Route::put('/templates/{id}', [\App\Http\Controllers\TemplateController::class, 'update'])->name('templates.update');
    Route::post('/templates', [\App\Http\Controllers\TemplateController::class, 'store'])->name('templates.store');
});
