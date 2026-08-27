<?php

use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::post('/templates', [TemplateController::class, 'store'])->name('templates.store');
});
