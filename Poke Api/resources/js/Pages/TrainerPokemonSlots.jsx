import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

const TrainerPokemonSlots = ({ pokemonInSlots, auth, errors }) => {
    return (
        <AuthenticatedLayout user={auth.user} errors={errors}>
            <div className="bg-red-700 min-h-screen py-8" style={{ backgroundColor: '#991B1B' }}>
                <h2 className="text-4xl text-white text-center mb-4">My Trainer Profile</h2>
                <div className="max-w-screen-xl mx-auto px-4 py-8 bg-gray-200 rounded-lg">
                    <h1 className="text-3xl text-black mb-4">My Team</h1>
                    <div className="mb-4">
                        <p className="text-lg text-black">Username: {auth.user.name}</p>
                        <p className="text-lg text-black">Email: {auth.user.email}</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4">
                        {pokemonInSlots.sort((a, b) => {return a.slot - b.slot } ).map((pokemon) => (
                            <div
                                key={pokemon.slot}
                                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                            >
                                <strong className="text-2xl font-bold block mb-2">
                                    Slot {pokemon.slot}
                                </strong>
                                <img
                                    src={pokemon.image ? pokemon.image : ''}
                                    alt={pokemon.name ? pokemon.name : ''}
                                    className="max-w-full h-auto mb-2"
                                    style={{ maxHeight: '200px' }}
                                />
                                <p className="text-2xl mb-2 font-bold">
                                    {pokemon.name ? pokemon.name : ''}
                                </p>
                                <p className="text-2xl font-bold mb-2">
                                    {pokemon.pokemon_id ? `# ${pokemon.pokemon_id}` : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TrainerPokemonSlots;
