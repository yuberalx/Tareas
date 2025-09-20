<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TareasController;

Route::get('/', [TareasController::class, 'index'])->name('home');
Route::get('/tareas', [TareasController::class, 'index'])->name('tareas.index');
Route::post('/tareas', [TareasController::class, 'store'])->name('tareas.store');
Route::put('/tareas/{tarea}', [TareasController::class, 'update'])->name('tareas.update');
Route::delete('/tareas/{tarea}', [TareasController::class, 'destroy'])->name('tareas.destroy');
Route::patch('/tareas/{tarea}/toggle', [TareasController::class, 'toggle'])->name('tareas.toggle');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
