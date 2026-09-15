<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Models\TemplateField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemplateFieldController extends Controller
{
    /**
     * Get all fields for a template.
     */
    public function index(Request $request, int $templateId)
    {
        $template = Template::where('id', $templateId)
            ->where('creator_id', Auth::id())
            ->firstOrFail();

        return response()->json($template->fields);
    }

    /**
     * Store a new template field.
     */
    public function store(Request $request, int $templateId)
    {
        $template = Template::where('id', $templateId)
            ->where('creator_id', Auth::id())
            ->firstOrFail();

        $validated = $request->validate([
            'fabric_object_name' => ['required', 'string', 'max:100'],
            'label' => ['required', 'string', 'max:100'],
            'field_type' => ['required', 'in:text,image'],
            'required' => ['boolean'],
            'sort_order' => ['integer'],
            'locked' => ['boolean'],
            'default_image_path' => ['nullable', 'string'],
        ]);

        $field = $template->fields()->create([
            'fabric_object_name' => $validated['fabric_object_name'],
            'label' => $validated['label'],
            'field_type' => $validated['field_type'],
            'required' => $validated['required'] ?? true,
            'sort_order' => $validated['sort_order'] ?? 0,
            'locked' => $validated['locked'] ?? false,
            'default_image_path' => $validated['default_image_path'] ?? null,
        ]);

        return response()->json($field, 201);
    }

    /**
     * Update a template field.
     */
    public function update(Request $request, int $templateId, int $fieldId)
    {
        $template = Template::where('id', $templateId)
            ->where('creator_id', Auth::id())
            ->firstOrFail();

        $field = $template->fields()->where('id', $fieldId)->firstOrFail();

        $validated = $request->validate([
            'fabric_object_name' => ['sometimes', 'string', 'max:100'],
            'label' => ['sometimes', 'string', 'max:100'],
            'field_type' => ['sometimes', 'in:text,image'],
            'required' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer'],
            'locked' => ['sometimes', 'boolean'],
            'default_image_path' => ['nullable', 'string'],
        ]);

        $field->update($validated);

        return response()->json($field);
    }

    /**
     * Delete a template field.
     */
    public function destroy(Request $request, int $templateId, int $fieldId)
    {
        $template = Template::where('id', $templateId)
            ->where('creator_id', Auth::id())
            ->firstOrFail();

        $field = $template->fields()->where('id', $fieldId)->firstOrFail();

        $field->delete();

        return response()->json(null, 204);
    }
}
