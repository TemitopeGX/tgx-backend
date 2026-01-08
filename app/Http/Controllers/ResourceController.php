<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resources = Resource::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('resources/index', [
            'resources' => $resources,
        ]);
    }

    /**
     * API: Display a listing of the resource.
     */
    public function apiIndex()
    {
        $resources = Resource::orderBy('created_at', 'desc')->get()->map(function ($resource) {
            return [
                'id' => $resource->id,
                'title' => $resource->title,
                'slug' => $resource->slug,
                'category' => $resource->category,
                'description' => $resource->description,
                'is_free' => (bool) $resource->is_free,
                'price' => $resource->price,
                'purchase_link' => $resource->purchase_link,
                'file_url' => $resource->file_url, // Directly link to external URL
                'thumbnail' => $resource->thumbnail ? url('storage/' . $resource->thumbnail) : null,
                'download_count' => $resource->download_count,
                'is_featured' => (bool) $resource->is_featured,
                'created_at' => $resource->created_at,
            ];
        });
        
        return response()->json($resources);
    }

    /**
     * API: Display the specified resource.
     */
    public function apiShow($slug)
    {
        $resource = Resource::where('slug', $slug)->firstOrFail();

        return response()->json([
            'id' => $resource->id,
            'title' => $resource->title,
            'slug' => $resource->slug,
            'category' => $resource->category,
            'description' => $resource->description,
            'is_free' => (bool) $resource->is_free,
            'price' => $resource->price,
            'purchase_link' => $resource->purchase_link,
            'file_url' => $resource->file_url,
            'thumbnail' => $resource->thumbnail ? url('storage/' . $resource->thumbnail) : null,
            'download_count' => $resource->download_count,
            'is_featured' => (bool) $resource->is_featured,
            'created_at' => $resource->created_at,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('resources/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:resources,slug',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'file_url' => 'nullable|url|required_if:is_free,true', // Required if Free
            'thumbnail' => 'nullable|image|max:5120', // 5MB max
            'is_featured' => 'boolean',
            'is_free' => 'boolean',
            'price' => 'nullable|string|max:255|required_if:is_free,false',
            'purchase_link' => 'nullable|url|required_if:is_free,false',
        ]);

        // Handle thumbnail upload (only thumbnail is uploaded, not the file)
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('resources/thumbnails', 'public');
        }

        Resource::create($validated);

        return redirect()->route('resources.index')
            ->with('success', 'Resource created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Resource $resource)
    {
        return Inertia::render('resources/show', [
            'resource' => $resource,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resource $resource)
    {
        return Inertia::render('resources/edit', [
            'resource' => $resource,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:resources,slug,' . $resource->id,
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'file_url' => 'nullable|url|required_if:is_free,true',
            'thumbnail' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
            'is_free' => 'boolean',
            'price' => 'nullable|string|max:255|required_if:is_free,false',
            'purchase_link' => 'nullable|url|required_if:is_free,false',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($resource->thumbnail) {
                Storage::disk('public')->delete($resource->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('resources/thumbnails', 'public');
        }

        $resource->update($validated);

        return redirect()->route('resources.index')
            ->with('success', 'Resource updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        // Delete thumbnail if exists
        if ($resource->thumbnail) {
            Storage::disk('public')->delete($resource->thumbnail);
        }

        $resource->delete();

        return redirect()->route('resources.index')
            ->with('success', 'Resource deleted successfully.');
    }

    /**
     * Increment download count and redirect to external URL
     */
    public function download(Resource $resource)
    {
        $resource->increment('download_count');

        return redirect($resource->file_url);
    }
}
