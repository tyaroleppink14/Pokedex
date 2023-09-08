<?php

use App\Http\Controllers\API\TeamAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Ajax\TestController;

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

Route::name('data.')->prefix('/data')->group(function () {
    Route::get('/getData', [TestController::class, 'getData'])->name('get.data');
});

Route::name('team.')->prefix('/team')->group(function () {
    Route::post('/create', [TeamAPIController::class, 'create'])->name('create.team');
    Route::delete('/destroy/{pokemonId}', [TeamAPIController::class, 'destroy'])->name('destroy.pokemon');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('/team/update', [TeamAPIController::class, 'update'])->name('team.update');




