<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


# Descripción

Un proyecto simple de Laravel + React (Inertia) para la gestión de tareas (CRUD + toggle), con API protegida por Sanctum.
Esta guía explica cómo clonar, instalar, ejecutar y desplegar la aplicación, además de listar los comandos útiles y las rutas principales.

Además del API, este proyecto cuenta con una vista frontend desarrollada en React, donde se puede:

* Ver
* Crear
* Editar
* Emininar
* Filtrar



## Versiones usadas
* php 8.3
* Composer 2.8
* Node 22.19
* Postgres SQL

  
## Configurar el archivo * .env.example pasarlo a * .env

Es necesario copiar el archivo .env.example a .env y editarlo con las variables de entorno, principalmente las de conexión a la base de datos (en este caso PostgreSQL).
## Comandos de instalación y ejecución

```
git clone https://github.com/yuberalx/Tareas.git
composer install
npm install
php artisan key:generate
php artisan migrate
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
npm run dev
composer run dev # Tambien puede usar
php artisan serve --host=127.0.0.1 --port=8000
```
## Rutas solo API
* POST /api/register (Registrarnos en el API)
* POST /api/login (login API para obtener el token)
## Usamos en los Headers Authorization y en el valor: Bearer <tu-token> y Accept: application/json
* GET /api/tareas → listar
* POST /api/tareas → crear (JSON)
* PUT /api/tareas/{tarea} → Editar datos de la tarea
* PATCH /api/tareas/42/toggle → Cambiar estado (completada/pendiente)
* DELETE /api/tareas/{id} → eliminar

Espero que el proyecto sea intuitivo y fácil de desplegar.
Cualquier duda, estaré dispuesto a colaborar.

