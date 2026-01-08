<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Visit;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Don't track admin dashboard routes or assets
        if ($request->is('dashboard*') || $request->is('admin*') || $request->is('storage*') || $request->is('build*')) {
            return $next($request);
        }

        try {
            Visit::create([
                'ip_address' => $request->ip(),
                'url' => $request->fullUrl(),
                'user_agent' => $request->userAgent(),
                'country_code' => $request->header('CF-IPCountry'), // Cloudflare support
            ]);
        } catch (\Exception $e) {
            // Silently fail logging to not disrupt traffic
        }

        return $next($request);
    }
}
