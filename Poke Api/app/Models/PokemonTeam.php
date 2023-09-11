<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PokemonTeam extends Model
{
    use HasFactory;

    protected $table = 'pokemonteam';

    protected $fillable = [
        "trainer_id",
        "name",
        "slot",
        "image",
        "pokemon_id"
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
