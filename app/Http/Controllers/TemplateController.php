<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemplateController extends Controller
{
    /**
     * Display a listing of templates.
     */
    public function index(Request $request)
    {
        $templates = Template::where('creator_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('dashboard', [
            'templates' => $templates,
        ]);
    }

    /**
     * Display the specified template.
     */
    public function show(Request $request, string $name)
    {
        $template = Template::where('name', $name)
            ->where('creator_id', Auth::id())
            ->firstOrFail();

        return inertia('templates/show', [
            'template' => $template,
        ]);
    }

    /**
     * Store a newly created template.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'width' => ['required', 'numeric', 'min:0.01'],
            'height' => ['required', 'numeric', 'min:0.01'],
            'unit' => ['required', 'in:px,in'],
            'dpi' => ['required', 'integer', 'min:72', 'max:600'],
        ]);

        Template::create([
            'creator_id' => Auth::id(),
            'name' => $validated['name'],
            'width' => $validated['width'],
            'height' => $validated['height'],
            'unit' => $validated['unit'],
            'dpi' => $validated['dpi'],
            'visibility' => 'private',
            'canvas_json' => null,
        ]);

        return redirect()->route('dashboard');
    }
}
