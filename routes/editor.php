<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EditorController;

Route::middleware('auth')->group(function () {
    Route::get('/template/{template_id}/editor', [EditorController::class, 'show'])->name('editor.show');
});