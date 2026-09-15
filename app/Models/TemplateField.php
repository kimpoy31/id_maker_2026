<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemplateField extends Model
{
    protected $fillable = [
        'template_id',
        'fabric_object_name',
        'label',
        'field_type',
        'required',
        'sort_order',
        'locked',
        'default_image_path',
    ];

    protected $casts = [
        'required' => 'boolean',
        'locked' => 'boolean',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }
}
