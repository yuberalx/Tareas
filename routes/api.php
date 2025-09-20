<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TareasApiController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tareas', [TareasApiController::class, 'index']);
    Route::post('/tareas', [TareasApiController::class, 'store']);
    Route::put('/tareas/{tarea}', [TareasApiController::class, 'update']);
    Route::delete('/tareas/{tarea}', [TareasApiController::class, 'destroy']);
    Route::patch('/tareas/{tarea}/toggle', [TareasApiController::class, 'toggle']);
});


// Registro
Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return response()->json($user, 201);
});

// Login
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Las credenciales son incorrectas.'],
        ]);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user,
    ]);
});
