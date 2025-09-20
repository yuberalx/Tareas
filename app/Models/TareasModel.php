<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use HasFactory;

class TareasModel extends Model
{
    protected $table = 'tareas';
    protected $fillable = ['titulo', 'descripcion', 'estado', 'fecha_vencimiento', 'completada'];
    protected $casts = [
        'completada' => 'boolean',
        'fecha_vencimiento' => 'date:Y-m-d',
    ];
}
