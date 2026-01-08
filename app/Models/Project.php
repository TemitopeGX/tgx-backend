<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'client',
        'role',
        'year',
        'slug',
        'description',
        'content',
        'thumbnail',
        'video_url',
        'live_url',
        'github_url',
        'technologies',
        'published_at',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'published_at' => 'date',
        'is_featured' => 'boolean',
    ];
}
