<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pages\PokedexPageController;
use App\Http\Controllers\Pages\TeamPageController;
use App\Http\Controllers\Pages\TrainerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'login');
Route::redirect('/pokedex', '/pokedex/1');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test', function () {
    return Inertia::render('Test');
})->middleware(['auth', 'verified'])->name('test');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::name('pokedex.')->prefix('/pokedex')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/{id?}', [PokedexPageController::class, 'index'])->name('pokedex');
    Route::get('/pokemon/{idOrName}', [PokedexPageController::class, 'getPokemonDetails'])->name('pokemon.details');
    Route::get('/pokedex/search', [PokedexPageController::class, 'search'])->name('pokedex.search');
});

Route::name('team.')->prefix('/team')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [TeamPageController::class, 'index'])->name('index');
    Route::get('/create', [TeamPageController::class, 'create'])->name('create'); // Add this line
});

Route::get('/trainer/pokemon', [TrainerController::class, 'showPokemonSlots'])->name('trainer.pokemon.slots');




require __DIR__.'/auth.php';

