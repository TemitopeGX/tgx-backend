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
        Schema::table('projects', function (Blueprint $table) {
            if (!Schema::hasColumn('projects', 'client')) {
                $table->string('client')->nullable()->after('content');
            }
            if (!Schema::hasColumn('projects', 'role')) {
                $table->string('role')->nullable()->after('client');
            }
            if (!Schema::hasColumn('projects', 'year')) {
                $table->string('year')->nullable()->after('role');
            }
            if (!Schema::hasColumn('projects', 'video_url')) {
                $table->string('video_url')->nullable()->after('thumbnail');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['client', 'role', 'year', 'video_url']);
        });
    }
};
