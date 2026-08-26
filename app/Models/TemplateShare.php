<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $template_id
 * @property int $shared_with_user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Template $template
 * @property-read User $sharedWithUser
 */
class TemplateShare extends Model
{
    protected $fillable = [
        'template_id',
        'shared_with_user_id',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class, 'template_id');
    }

    public function sharedWithUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'shared_with_user_id');
    }
}
