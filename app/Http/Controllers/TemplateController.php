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

        $template = Template::create([
            'creator_id' => Auth::id(),
            'name'       => $validated['name'],
            'width'      => $validated['width'],
            'height'     => $validated['height'],
            'dpi'        => $validated['dpi'],
            'unit'       => $validated['unit'],
            'visibility' => 'private',
        ]);

        return to_route('editor.show', $template->id);
    }

    public function show(Template $template)
    {
        $this->authorize('view', $template);

        return Inertia::render('editor/show', [
            'template' => $template,
        ]);
    }

    public function update(Request $request, Template $template)
    {
        $this->authorize('update', $template);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'width' => 'sometimes|required|numeric|min:0.01',
            'height' => 'sometimes|required|numeric|min:0.01',
            'dpi' => 'sometimes|required|integer|min:1',
            'unit' => 'sometimes|required|in:in,px',
            'canvas_json' => 'nullable|string',
        ]);

        // Handle canvas_json separately since it needs JSON decoding
        $updateData = $validated;
        if (isset($validated['canvas_json'])) {
            $updateData['canvas_json'] = json_decode($validated['canvas_json'], true);
        }

        $template->update($updateData);

        return back();
    }

    public function destroy(Template $template)
    {
        $this->authorize('delete', $template);

        $template->delete();

        return to_route('templates');
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