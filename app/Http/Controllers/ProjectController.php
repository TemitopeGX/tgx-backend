<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('projects/index', [
            'projects' => Project::orderBy('sort_order')->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function apiIndex()
    {
        $projects = Project::orderBy('sort_order')->orderBy('created_at', 'desc')->get();
        return response()->json($projects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'thumbnail' => $project->thumbnail ? asset('storage/' . $project->thumbnail) : null,
                'year' => $project->year ?? $project->created_at->format('Y'),
                'category' => $project->category ?? 'Development',
                'client' => $project->client,
                'role' => $project->role,
                'video_url' => $project->video_url,
                'tags' => $project->technologies,
                'live_url' => $project->live_url
            ];
        }));
    }

    public function apiShow($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        return response()->json([
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'description' => $project->description,
            'content' => $project->content,
            'thumbnail' => $project->thumbnail ? asset('storage/' . $project->thumbnail) : null,
            'year' => $project->year ?? $project->created_at->format('Y'),
            'category' => $project->category ?? 'Development',
            'client' => $project->client,
            'role' => $project->role,
            'video_url' => $project->video_url,
            'tags' => $project->technologies,
            'live_url' => $project->live_url,
            'github_url' => $project->github_url,
        ]);
    }

    public function create()
    {
        return Inertia::render('projects/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'category' => 'nullable|string|max:255',
            'client' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'thumbnail' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = $path;
        }

        Project::create($validated);

        return to_route('projects.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('projects/edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'category' => 'nullable|string|max:255',
            'client' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'technologies' => 'nullable|array',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = $path;
        } else {
             unset($validated['thumbnail']);
        }

        $project->update($validated);

        return to_route('projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return to_route('projects.index');
    }
}
