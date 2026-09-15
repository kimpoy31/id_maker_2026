<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EditorController extends Controller
{
    public function show($template_id)
    {
        $template = Template::findOrFail($template_id);

        $this->authorize('view', $template);

        return Inertia::render('editor/show', [
            'template' => $template,
        ]);
    }
}
