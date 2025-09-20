<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TareasModel as Tarea;

class TareasApiController extends Controller
{
    public function index()
    {
        return response()->json(Tarea::all());
    }

    public function store(Request $request)
    {
        $tarea = Tarea::create($request->all());
        return response()->json($tarea, 201);
    }

    public function update(Request $request, Tarea $tarea)
    {
        $tarea->update($request->all());
        return response()->json($tarea);
    }

    public function destroy(Tarea $tarea)
    {
        $tarea->delete();
        return response()->json(null, 204);
    }

    public function toggle(Tarea $tarea)
    {
        $tarea->completada = !$tarea->completada;
        $tarea->save();

        return response()->json($tarea);
    }
}
