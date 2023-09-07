import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '../Pokedex/tailwind.css';

function TeamCreate({ availablePokemon, addToTeam, auth, errors }) {
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const maxTeamSize = 6;

    const addToSelectedPokemon = (pokemon) => {
        if (selectedPokemon.length < maxTeamSize) {
            setSelectedPokemon([...selectedPokemon, pokemon]);
        }
    };

    const removeFromSelectedPokemon = (pokemon) => {
        const updatedSelectedPokemon = selectedPokemon.filter((p) => p.id !== pokemon.id);
        setSelectedPokemon(updatedSelectedPokemon);
    };

    const isPokemonSelected = (pokemon) => {
        return selectedPokemon.some((p) => p.id === pokemon.id);
    };

    const addOrRemovePokemon = (pokemon) => {
        if (isPokemonSelected(pokemon)) {
            removeFromSelectedPokemon(pokemon);
        } else {
            addToSelectedPokemon(pokemon);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} errors={errors}>
            <div>
                <h1>Add Pokemon to Your Team</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {availablePokemon.map((pokemon) => (
                        <li key={pokemon.id}>
                            <div className="border-2 border-black rounded-lg p-4 m-4 text-center bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                <img src={pokemon.spriteURL} alt={pokemon.name} className="mx-auto mb-2 w-24 h-24" />
                                <strong className="block text-2xl font-extrabold text-black">
                                    #{pokemon.id} {pokemon.name}
                                </strong>
                                <button
                                    onClick={() => addOrRemovePokemon(pokemon)}
                                    className={`mt-2 py-2 px-4 rounded-md ${
                                        isPokemonSelected(pokemon) ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                                    }`}
                                >
                                    {isPokemonSelected(pokemon) ? 'Remove' : 'Add'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}

export default TeamCreate;
