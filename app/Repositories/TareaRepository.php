<?php

namespace App\Repositories;

use App\Models\TareasModel;
use Illuminate\Database\Eloquent\Collection;

class TareaRepository implements TareaRepositoryInterface
{
    protected $model;

    public function __construct(TareasModel $model)
    {
        $this->model = $model;
    }

    public function getAll(): Collection
    {
        return $this->model->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data): TareasModel
    {
        return $this->model->create([
            'titulo' => $data['titulo'],
            'descripcion' => $data['descripcion'] ?? null,
            'fecha_vencimiento' => $data['fecha_vencimiento'] ?? null,
            'completada' => false,
        ]);
    }

    public function update(TareasModel $tarea, array $data): TareasModel
    {
        $tarea->update([
            'titulo' => $data['titulo'],
            'descripcion' => $data['descripcion'] ?? $tarea->descripcion,
            'fecha_vencimiento' => $data['fecha_vencimiento'] ?? $tarea->fecha_vencimiento,
            'completada' => $data['completada'] ?? $tarea->completada,
        ]);

        return $tarea->fresh(); // Devuelve el modelo actualizado
    }

    public function delete(TareasModel $tarea): bool
    {
        return $tarea->delete();
    }

    public function toggleCompletada(TareasModel $tarea): TareasModel
    {
        $tarea->completada = !$tarea->completada;
        $tarea->save();

        return $tarea;
    }

}
