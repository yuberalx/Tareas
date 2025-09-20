<?php

namespace App\Repositories;

use App\Models\TareasModel;
use Illuminate\Database\Eloquent\Collection;

interface TareaRepositoryInterface
{
    public function getAll(): Collection;
    public function create(array $data): TareasModel;
    public function update(TareasModel $tarea, array $data): TareasModel;
    public function delete(TareasModel $tarea): bool;
    public function toggleCompletada(TareasModel $tarea): TareasModel;
}