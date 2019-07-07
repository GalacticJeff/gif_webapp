<?php

namespace App\Http\Middleware;

use Closure;
use App\search_logs;

class searchLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Pre-Middleware Action
        
        $response = $next($request);

        // Post-Middleware Action

        return $response;
    }
}
