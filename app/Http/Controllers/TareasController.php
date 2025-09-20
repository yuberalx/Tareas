<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TareasModel;
use App\Repositories\TareaRepositoryInterface;

class TareasController extends Controller
{

    protected $tareaRepository;

    public function __construct(TareaRepositoryInterface $tareaRepository)
    {
        $this->tareaRepository = $tareaRepository;
    }

    public function index()
    {
        $tareas = $this->tareaRepository->getAll();
        return Inertia::render('Tareas/index', ['tareas' => $tareas]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha_vencimiento' => 'nullable|date',
        ]);

        $this->tareaRepository->create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'fecha_vencimiento' => $request->fecha_vencimiento,
            'completada' => false,
        ]);

        return redirect()->route('tareas.index');
    }

    public function update(Request $request, TareasModel $tarea)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $tarea = $this->tareaRepository->update($tarea, [
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'fecha_vencimiento' => $request->fecha_vencimiento,
            'completada' => $request->completada ?? $tarea->completada,
        ]);

        return redirect()->route('tareas.index');
    }

    public function destroy(TareasModel $tarea)
    {
        $tarea = $this->tareaRepository->delete($tarea);
        return redirect()->route('tareas.index');
    }

    public function toggle(TareasModel $tarea)
    {
        $tarea = $this->tareaRepository->toggleCompletada($tarea);
        return redirect()->route('tareas.index');
    }
}
