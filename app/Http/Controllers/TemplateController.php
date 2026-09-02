<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Template::class);

        $user = Auth::user();

        $templates = $user->role === 'admin'
            ? Template::all()
            : Template::where('creator_id', $user->id)->get();

        return Inertia::render('templates/index', [
            'templates' => $templates,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'width'  => 'required|numeric|min:0.01',
            'height' => 'required|numeric|min:0.01',
            'dpi'    => 'required|integer|min:1',
            'unit'   => 'required|in:in,px',
        ]);

        if ($validated['unit'] === 'in') {
            $widthPx  = (int) round($validated['width'] * $validated['dpi']);
            $heightPx = (int) round($validated['height'] * $validated['dpi']);
        } else {
            $widthPx  = (int) round($validated['width']);
            $heightPx = (int) round($validated['height']);
        }

        $template = Template::create([
            'creator_id' => Auth::id(),
            'name'       => $validated['name'],
            'width_px'   => $widthPx,
            'height_px'  => $heightPx,
            'dpi'        => $validated['dpi'],
            'input_unit' => $validated['unit'] === 'in' ? 'inches' : 'pixels',
            'visibility' => 'private',
        ]);

        return redirect()->route('dashboard');
    }
}