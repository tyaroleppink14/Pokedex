<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\PokemonTeam;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class TeamPageController extends Controller
{
    public function index()
    {
        $trainerId = auth()->id();
        $team = PokemonTeam::where('trainer_id', $trainerId)->get();

        return Inertia::render('Team/TeamIndex', [
            'team' => $team,
        ]);
    }

    public function create()
    {
        try {
            $response = Http::get('https://api.example.com/pokemon');

            if ($response->successful()) {
                $availablePokemon = $response->json();
            } else {
                $availablePokemon = [];
            }
        } catch (\Exception $e) {
            $availablePokemon = [];
        }

        return Inertia::render('Team/TeamCreate', [
            'availablePokemon' => $availablePokemon,
        ]);
    }
}
