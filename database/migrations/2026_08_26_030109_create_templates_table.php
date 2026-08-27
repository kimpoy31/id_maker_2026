<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
        $table->id();
        $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
        $table->string('name');
        $table->decimal('width', 10, 2);
        $table->decimal('height', 10, 2);
        $table->enum('unit', ['px', 'in'])->default('px');
        $table->integer('dpi')->default(96);
        $table->json('canvas_json')->nullable();
        $table->enum('visibility', ['private', 'shared', 'global'])->default('private');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
