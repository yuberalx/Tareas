<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Handle unauthenticated users.
     */
    protected function unauthenticated($request, array $guards)
    {
        abort(response()->json([
            'message' => 'No autenticado. Debes enviar un token válido.'
        ], 401));
    }
}
