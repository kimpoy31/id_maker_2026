<?php

namespace App\Policies;

use App\Models\Template;
use App\Models\User;

class TemplatePolicy
{
    /**
     * Anyone with editor or admin role can list templates.
     * Route middleware already blocks plain 'user' role from reaching this
     * at all — this is a second layer, not the only layer.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['editor', 'admin']);
    }

    /**
     * Can view a single template if: they created it, OR they're an admin,
     * OR the template is shared with them / global (fill access, not edit).
     */
    public function view(User $user, Template $template): bool
    {
        if ($user->role === 'admin' || $template->creator_id === $user->id) {
            return true;
        }

        if ($template->visibility === 'global') {
            return true;
        }

        if ($template->visibility === 'shared') {
            return $template->shares()->where('shared_with_user_id', $user->id)->exists();
        }

        return false;
    }

    /**
     * Any editor or admin can create a new template.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['editor', 'admin']);
    }

    /**
     * Only the creator or an admin can edit a template's structure
     * (canvas, fields, visibility, locks, etc).
     */
    public function update(User $user, Template $template): bool
    {
        return $user->role === 'admin' || $template->creator_id === $user->id;
    }

    /**
     * Same rule as update — only creator or admin can delete.
     */
    public function delete(User $user, Template $template): bool
    {
        return $user->role === 'admin' || $template->creator_id === $user->id;
    }

    public function restore(User $user, Template $template): bool
    {
        return $user->role === 'admin' || $template->creator_id === $user->id;
    }

    public function forceDelete(User $user, Template $template): bool
    {
        return $user->role === 'admin';
    }
}