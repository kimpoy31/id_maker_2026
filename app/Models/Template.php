<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $creator_id
 * @property string $name
 * @property int $width_px
 * @property int $height_px
 * @property object|null $canvas_json
 * @property string $visibility
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $creator
 * @property-read \Illuminate\Database\Eloquent\Collection<int, TemplateShare> $shares
 */
#[Hidden(['canvas_json'])]
class Template extends Model
{
    protected $fillable = [
        'creator_id',
        'name',
        'width_px',
        'height_px',
        'canvas_json',
        'visibility',
    ];

    protected $casts = [
        'canvas_json' => 'array',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function shares(): HasMany
    {
        return $this->hasMany(TemplateShare::class, 'template_id');
    }
}
