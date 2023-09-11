import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios'; // Import Axios

const TrainerPokemonSlots = ({ pokemonInSlots, auth, errors }) => {
    const [pokemonSlots, setPokemonSlots] = useState(pokemonInSlots);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedSlots = reorder(
            pokemonSlots,
            result.source.index,
            result.destination.index
        );

        const updatedPokemonSlots = updatedSlots.map((pokemon, index) => ({
            ...pokemon,
            slot: index + 1,
        }));

        setPokemonSlots(updatedPokemonSlots);
    };

    const updatePokemonSlots = async () => {
        try {
            console.log(pokemonSlots);
            const response = await axios.post('/api/team/update', {
                newSlots: pokemonSlots,
            });

            console.log('Response from server:', response.data); // Log the response

            if (response.data.success) {
                console.log('Pokémon slots updated successfully.');
            } else {
                console.error('Failed to update Pokémon slots:', response.data.response);
            }
        } catch (error) {
            console.error('An error occurred while updating Pokémon slots:', error);
        }
    };

    useEffect(() => {
        // Sort the slots based on their slot numbers
        pokemonSlots.sort((a, b) => a.slot - b.slot);
    }, [pokemonSlots]);

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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="pokemon-slots" direction="horizontal">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="grid grid-cols-6 gap-4"
                                >
                                    {pokemonSlots.map((pokemon, index) => (
                                        <Draggable key={pokemon.slot} draggableId={pokemon.slot.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
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
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button onClick={updatePokemonSlots} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TrainerPokemonSlots;
