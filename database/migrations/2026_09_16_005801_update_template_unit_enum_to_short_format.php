<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Backfill data: 'inches' -> 'in', 'pixels' -> 'px'
        DB::statement("UPDATE templates SET unit = 'in' WHERE unit = 'inches'");
        DB::statement("UPDATE templates SET unit = 'px' WHERE unit = 'pixels'");

        // Change the enum definition
        Schema::table('templates', function (Blueprint $table) {
            $table->enum('unit', ['in', 'px'])->default('in')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Backfill data: 'in' -> 'inches', 'px' -> 'pixels'
        DB::statement("UPDATE templates SET unit = 'inches' WHERE unit = 'in'");
        DB::statement("UPDATE templates SET unit = 'pixels' WHERE unit = 'px'");

        // Revert the enum definition
        Schema::table('templates', function (Blueprint $table) {
            $table->enum('unit', ['inches', 'pixels'])->default('inches')->change();
        });
    }
};
