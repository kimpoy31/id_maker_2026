<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $this->authorizeAdmin();

        $users = User::orderBy('created_at', 'desc')->get();

        return inertia('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:admin,editor,user'],
        ]);

        User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('users.index');
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, int $id)
    {
        $this->authorizeAdmin();

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $id],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['required', 'in:admin,editor,user'],
        ]);

        // Guard: Ensure at least one admin remains
        if ($user->role === 'admin' && $validated['role'] !== 'admin') {
            $adminCount = User::where('role', 'admin')->where('id', '!=', $id)->count();
            if ($adminCount === 0) {
                throw ValidationException::withMessages([
                    'role' => 'At least one admin must remain in the system.',
                ]);
            }
        }

        $user->update([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'role' => $validated['role'],
        ]);

        if (!empty($validated['password'])) {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified user (soft delete).
     */
    public function destroy(Request $request, int $id)
    {
        $this->authorizeAdmin();

        $user = User::findOrFail($id);

        // Prevent deleting the current user
        if ($user->id === Auth::id()) {
            throw ValidationException::withMessages([
                'user' => 'You cannot delete your own account.',
            ]);
        }

        // Guard: Ensure at least one admin remains
        if ($user->role === 'admin') {
            $adminCount = User::where('role', 'admin')->where('id', '!=', $id)->count();
            if ($adminCount === 0) {
                throw ValidationException::withMessages([
                    'user' => 'Cannot delete the last admin. At least one admin must remain.',
                ]);
            }
        }

        $user->delete();

        return redirect()->route('users.index');
    }

    /**
     * Ensure the current user is an admin.
     */
    private function authorizeAdmin(): void
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Access denied. Admin only.');
        }
    }
}
