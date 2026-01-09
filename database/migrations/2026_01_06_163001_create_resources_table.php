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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // Design, Dev, Strategy
            $table->text('description')->nullable();
            $table->string('type')->nullable(); // Figma, PDF, etc
            $table->string('size')->nullable();
            $table->string('file_url')->nullable(); // Path to file
            $table->string('image_url')->nullable(); // Preview image
            $table->string('thumbnail')->nullable(); // Thumbnail image
            $table->boolean('is_external')->default(false); // Link vs File
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_free')->default(true);
            $table->decimal('price', 10, 2)->nullable();
            $table->string('purchase_link')->nullable();
            $table->integer('download_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
