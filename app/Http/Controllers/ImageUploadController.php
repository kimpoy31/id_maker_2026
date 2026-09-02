<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    /**
     * Upload image to storage and return path.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:10240'], // Max 10MB
        ]);

        $path = $request->file('image')->store('template-images', 'public');

        return response()->json([
            'path' => $path,
            'url' => Storage::url($path),
        ]);
    }
}
