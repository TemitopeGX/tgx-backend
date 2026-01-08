<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'is_free',
        'price',
        'purchase_link',
        'file_url',
        'thumbnail',
        'download_count',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_free' => 'boolean',
        'download_count' => 'integer',
    ];
}
