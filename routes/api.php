<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::options('{any}', function () {
    return response('OK', 204)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

Route::group(['middleware' => [],], function () {
    Route::post('/user/login', [LoginController::class, 'login']);
    Route::post('/user/register', [LoginController::class, 'register']);
});

Route::group(['middleware' => ['auth:api']], function () {

    Route::post('/user/logout', [LoginController::class, 'logout']);

    Route::group(['middleware' => ['admin']], function () {
        Route::post('/tasks/create', [TaskController::class, 'create']);
        Route::put('/tasks/{id}/update', [TaskController::class, 'update']);
        Route::delete('/tasks/{id}/delete', [TaskController::class, 'delete']);
        Route::get('/tasks/{id}', [TaskController::class, 'record']);
    });
    Route::group(['middleware' => ['user']], function () {
        Route::post('/tasks/records', [TaskController::class, 'records']);
    });
});
