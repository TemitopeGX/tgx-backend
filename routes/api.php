<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\API\ResourceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public API Routes
Route::get('/projects', [ProjectController::class, 'apiIndex']);
Route::get('/projects/{slug}', [ProjectController::class, 'apiShow']);
// Route::get('/resources', [ResourceController::class, 'index']);
