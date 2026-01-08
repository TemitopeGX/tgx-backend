<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resource;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Resource::orderBy('category')->orderBy('title')->get();
        
        // Group by category for frontend consumption if needed, or return flat list
        // Returning flat list is more flexible for frontend filtering/grouping
        return response()->json($resources->map(function ($resource) {
            return [
                'id' => $resource->id,
                'title' => $resource->title,
                'category' => $resource->category,
                'type' => $resource->type,
                'size' => $resource->size,
                'image' => $resource->image_url ? asset('storage/' . $resource->image_url) : null,
                'link' => $resource->is_external ? $resource->file_url : asset('storage/' . $resource->file_url),
                'is_external' => $resource->is_external,
            ];
        }));
    }
}
