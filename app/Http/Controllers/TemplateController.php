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
        $this->authorizeEditorOrAdmin();

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
            'width'   => $widthPx,
            'height'  => $heightPx,
            'dpi'        => $validated['dpi'],
            'unit' => $validated['unit'] === 'in' ? 'inches' : 'pixels',
            'visibility' => 'private',
        ]);

        return to_route('editor.show', $template->id);
    }

    /**
     * Ensure the current user is an editor or admin.
     */
    private function authorizeEditorOrAdmin(): void
    {
        if (!in_array(Auth::user()->role, ['editor', 'admin'], true)) {
            abort(403, 'Access denied. Editor or admin only.');
        }
    }
}