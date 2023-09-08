import React, {useEffect, useRef, useState} from 'react';
import './tailwind.css';
import Pokeball from "../../../IMG/Pokeball.png"
import Modal from "@/Components/Modal.jsx";
function StatLine({ value, maxValue, statName }) {
    const percentage = (value / maxValue) * 100;
    const clampedPercentage = Math.min(percentage, 100);

    const statColors = {
        hp: 'bg-green-400',
        attack: 'bg-red-400',
        defense: 'bg-blue-400',
        specialAttack: 'bg-yellow-400',
        specialDefense: 'bg-indigo-400',
        speed: 'bg-purple-400',
    };

    const statColor = statColors[statName] || 'bg-yellow-400';

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full ${statColor}`} style={{ width: `${clampedPercentage}%` }}></div>
        </div>
    );
}
function SlotSelectionModal(props) {
    const initialRender = useRef(true);
    const slots = [1, 2, 3, 4, 5, 6];
    const maxStatValue = 255;
    const [newPokemon, setNewPokemon] = useState(
        {
            "trainer_id": props.trainer_id,
            "pokemon_id": props.pokemonDetails.id,
            "name" : props.pokemonDetails.name,
            "slot" : 1,
            "image" : props.pokemonDetails.sprites.front_default
        }
    )
    const [selectedSlot, setSelectedSlot] = useState(1);
    const handleAddToTeam = async (slot) => {
        const updatedPokemon = {
            ...newPokemon,
            slot: slot
        }
        await fetch('/api/team/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPokemon),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to add to team.');
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return props.setIsSlotSelectionModalOpen(false);
    };

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            handleAddToTeam();
        }
    }, [selectedSlot]);

    return (
        <Modal show={props.isSlotSelectionModalOpen}>
            <div className="bg-white rounded-lg p-4 shadow-md text-black flex">
                <div className="w-1/2 p-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">{props.pokemonDetails.name}</h2>
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                        <img
                            src={props.pokemonDetails.sprites.front_default}
                            alt={props.pokemonDetails.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Stats:</h2>
                        <ul className="max-h-40 overflow-y-auto">
                            {props.pokemonDetails.stats.map((stat, index) => (
                                <li key={index}>
                                    {stat.stat.name}: {stat.base_stat}
                                    <StatLine value={stat.base_stat} maxValue={maxStatValue} statName={stat.stat.name} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={() => props.setIsSlotSelectionModalOpen(false)}
                        className="mt-4 py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                        Go Back
                    </button>
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-4">Select a Slot</h2>
                    <div className="flex flex-col items-center">
                        {slots.map((slot) => (
                            <button
                                key={slot}
                                className="w-32 h-16 m-2 px-4 py-2 rounded-md bg-white text-black border border-black hover:shadow-md flex items-center justify-center"
                                onClick={() => {
                                    handleAddToTeam(slot)
                                }}
                            >
                                Slot {slot}
                                <img
                                    src={Pokeball}
                                    className="w-6 h-6 ml-2"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}



function PokemonDetail(props) {
    const maxStatValue = 255;
    const [isAddedToTeam, setIsAddedToTeam] = useState(false);
    const [isSlotSelectionModalOpen, setIsSlotSelectionModalOpen] = useState(false);

    return (
        <div  className="bg-white rounded-lg p-4 shadow-md text-black">
            <div className="mb-4">
                <button
                    onClick={props.onClose}
                    className="text-red-500 hover:underline transition duration-300 ease-in-out transform hover:scale-105 text-black"
                >
                    Back to Pokedex
                </button>
            </div>
            <h2 className="text-2xl font-bold">{props.pokemonDetails.name}</h2>
            <div className="flex">
                <div className="w-64 h-64 mr-4">
                    <img
                        src={props.pokemonDetails.sprites.front_default}
                        alt={props.pokemonDetails.name}
                        className="w-full h-full rounded-full border-4 border-white"
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-xl font-bold">Weight:</h2>
                        <p>{props.pokemonDetails.weight}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-4">Height:</h2>
                        <p>{props.pokemonDetails.height}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-4">Type:</h2>
                        {props.pokemonDetails.types.map((typeInfo, index) => (
                            <p key={index}>{typeInfo.type.name}</p>
                        ))}
                    </div>
                </div>
                <div className="ml-8 flex flex-col">
                    <h2 className="text-xl font-bold">Abilities:</h2>
                    <ul>
                        {props.pokemonDetails.abilities.map((ability, index) => (
                            <li key={index}>
                                {ability.ability.name}
                                <br />
                            </li>
                        ))}
                        <h2 className="text-xl font-bold mt-4">Base Experience: </h2>
                        <p>  Base Experience: {props.pokemonDetails.base_experience}</p>
                    </ul>
                </div>
                <div className="ml-8 flex flex-col">
                    <h2 className="text-xl font-bold">Stats:</h2>
                    <ul className="max-h-40">
                        {props.pokemonDetails.stats.map((stat, index) => (
                            <li key={index}>
                                {stat.stat.name}: {stat.base_stat}
                                <StatLine value={stat.base_stat} maxValue={maxStatValue} statName={stat.stat.name} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ml-8 flex flex-col">
                    <h2 className="text-xl font-bold">Moves:</h2>
                    <ul className="overflow-y-auto max-h-48">
                        {props.pokemonDetails.moves.map((move, index) => (
                            <li key={index}>
                                {move.move.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ml-8 flex flex-col">
                    <button
                        onClick={() => {setIsSlotSelectionModalOpen(true)}}
                        className={`mt-4 py-2 px-4 rounded-md ${
                            isAddedToTeam ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white'
                        }`}
                        disabled={isAddedToTeam}
                    >
                        {isAddedToTeam ? 'Added to Team' : 'Add to Team'}
                    </button>
                </div>
            </div>
            {/* Render the SlotSelectionModal */}
            <SlotSelectionModal
                trainer_id={props.auth.user.id}
                isSlotSelectionModalOpen={isSlotSelectionModalOpen}
                setIsSlotSelectionModalOpen={setIsSlotSelectionModalOpen}
                pokemonDetails={props.pokemonDetails}
            />
        </div>
    );
}

export default PokemonDetail;
