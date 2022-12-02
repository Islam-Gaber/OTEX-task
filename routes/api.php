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
    Route::post('login', [LoginController::class, 'login']);
    Route::post('register', [LoginController::class, 'register']);
});

Route::group(['middleware' => ['auth:api']], function () {

    Route::post('logout', [LoginController::class, 'logout']);

    Route::group(['middleware' => ['admin']], function () {
        Route::post('/tasks/create', [TaskController::class, 'create']);
        Route::post('/tasks/records', [TaskController::class, 'records']);
    });
    Route::group(['middleware' => ['user']], function () {
    });
});
