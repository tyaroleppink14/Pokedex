<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\PokemonTeam;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class TeamAPIController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'trainer_id' => 'required|integer',
            'pokemon_id' => 'required|integer',
            'name' => 'required|string',
            'slot' => 'required|integer|min:1|max:6',
            'image' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            $trainer_id = $validated['trainer_id'];
            $slot = $validated['slot'];

            // Check if a team record exists for the user
            $teamExists = PokemonTeam::where('trainer_id', $trainer_id)->where('slot', $slot)->exists();

            if ($teamExists) {
                DB::table('pokemonteam')
                    ->where('trainer_id', $trainer_id)
                    ->where('slot', $slot)
                    ->update([
                        'pokemon_id' => $validated['pokemon_id'],
                        'name' => $validated['name'],
                        'image' => $validated['image'],
                    ]);
            } else {
                // Create a new team record if it doesn't exist
                DB::table('pokemonteam')->insert([
                    'trainer_id' => $trainer_id,
                    'pokemon_id' => $validated['pokemon_id'],
                    'slot' => $slot,
                    'name' => $validated['name'],
                    'image' => $validated['image'],
                ]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['success' => false, 'response' => $e->getMessage()]);
        }

        return response()->json(['success' => true, 'response' => 'pokemon-added-to-team']);
    }

    public function destroy(Request $request, $pokemonId)
    {
        $trainerId = auth()->id();

        PokemonTeam::where('trainer_id', $trainerId)
            ->where('pokemon_id', $pokemonId)
            ->delete();

        return response()->json(['message' => 'Pokemon removed from your team.']);
    }
}
