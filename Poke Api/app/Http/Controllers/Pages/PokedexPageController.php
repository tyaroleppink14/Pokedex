<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class PokedexPageController extends Controller
{
    public function index(Request $request, $id = null)
    {
        if ($id === null) {
            $id = 1;
        }

        $limit = 20;
        $offset = (intval($id) - 1) * $limit;
        $previousPage = (int)$id - 1;
        $nextPage = (int)$id + 1;

        $apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=$limit&offset=$offset";

        $searchQuery = $request->input('q');

        if ($searchQuery) {
            $apiUrl .= "&q=" . urlencode($searchQuery);
        }

        $response = Http::get($apiUrl);
        $pokemonData = $response->json();
        $pokemonList = [];

        foreach ($pokemonData['results'] as $index => $pokemon) {
            $pokemonId = ($index + 1) + $offset;
            $imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{$pokemonId}.png";
            $pokemonList[] = [
                'name' => $pokemon['name'],
                'imageURL' => $imageURL,
                'id' => $pokemonId
            ];
        }

        return Inertia::render('Pokedex/Pokedex', [
            'pokemonData' => $pokemonList,
            'pageTitle' => 'Pokedex Page',
            'previousPage' => $previousPage,
            'nextPage' => $nextPage,
            'searchQuery' => $searchQuery,
        ]);
    }

    public function getPokemonDetails($idOrName)
    {
        $apiUrl = "https://pokeapi.co/api/v2/pokemon/$idOrName";

        $response = Http::get($apiUrl);
        $pokemonDetails = $response->json();

        return Inertia::render('Pokedex/PokemonDetail', [
            'pokemonDetails' => $pokemonDetails,
            'pageTitle' => 'Pokemon Detail Page',
        ]);
    }

    public function search(Request $request)
    {
        $searchQuery = $request->input('q');

        $apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000";
        $response = Http::get($apiUrl);
        $pokemonData = $response->json();
        $pokemonDetails = [];

        foreach ($pokemonData['results'] as $index => $pokemon) {
            if (str_contains($pokemon['name'], $searchQuery)) {
                $pokemonId = ($index + 1);

                $imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{$pokemonId}.png";

                $pokemonDetails[] = [
                    'name' => $pokemon['name'],
                    'imageURL' => $imageUrl,
                ];
            }
        }

        if (empty($pokemonDetails)) {
            $pokemonDetails[] = [
                'name' => 'No results found',
                'imageURL' => null,
            ];
        }

        return Inertia::render('Pokedex/Pokedex', [
            'pokemonData' => $pokemonDetails,
            'pageTitle' => 'Pokedex Page',
            'previousPage' => null,
            'nextPage' => null,
            'searchQuery' => $searchQuery,
        ]);
    }


}
