<?php

namespace App\Http\Controllers\Pages;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\PokemonTeam;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;


class TrainerController extends Controller
{
    public function showPokemonSlots()
    {
        // Get the authenticated trainer's ID
        $trainerId = auth()->id();

        // Query the database to retrieve Pokémon in the trainer's slots
        $pokemonInSlots = PokemonTeam::where('trainer_id', $trainerId)->get();

        return Inertia::render('TrainerPokemonSlots', ['pokemonInSlots' => $pokemonInSlots]);
    }


}
