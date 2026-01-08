<?php

use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('api/projects', [ProjectController::class, 'apiIndex']);
Route::get('api/projects/{slug}', [ProjectController::class, 'apiShow']);
Route::get('api/resources', [ResourceController::class, 'apiIndex']);
Route::get('api/resources/{slug}', [ResourceController::class, 'apiShow']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
        'stats' => [
            'projects' => \App\Models\Project::count(),
            'skills' => \App\Models\Skill::count(),
            'experience' => \App\Models\Experience::count(),
            'messages' => \App\Models\Contact::whereNull('read_at')->count(),
        ],
        'recent_projects' => \App\Models\Project::latest()->take(5)->get(['id', 'title', 'category', 'created_at', 'thumbnail']),
        'recent_messages' => \App\Models\Contact::latest()->take(5)->get(['id', 'name', 'email', 'subject', 'created_at']),
        'visitor_stats' => [
            'views' => \App\Models\Visit::count(),
            'unique' => \App\Models\Visit::distinct('ip_address')->count('ip_address'),
            'top_regions' => \App\Models\Visit::select('country_code', \DB::raw('count(*) as count'))
                ->whereNotNull('country_code')
                ->groupBy('country_code')
                ->orderByDesc('count')
                ->take(4)
                ->get()
        ],
        'last_update' => collect([
            \App\Models\Project::max('updated_at'),
            \App\Models\Skill::max('updated_at'),
            \App\Models\Experience::max('updated_at')
        ])->max() ?? now(),
        ]);
    })->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('experiences', ExperienceController::class);
    Route::resource('resources', ResourceController::class);
    Route::get('resources/{resource}/download', [ResourceController::class, 'download'])->name('resources.download');
});

require __DIR__.'/settings.php';
