<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin account seeder
        $admin = User::firstOrCreate(
            ['username' => config('app.admin.username')],
            [
                'name' => config('app.admin.name'),
                'username' => config('app.admin.username'),
                'password' => bcrypt(config('app.admin.password')),
                'role' => 'admin',
            ]
        );
    }
}
