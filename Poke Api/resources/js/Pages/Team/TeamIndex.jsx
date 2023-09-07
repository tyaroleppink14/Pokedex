import React, { useEffect, useState } from 'react';

function TeamIndex(props) {
    const [pokemonTeam, setPokemonTeam] = useState([]);

    useEffect(() => {
        setPokemonTeam(props.team);
    }, [props.team]);

    return (
        <div>
            <h1>Your Pokemon Team</h1>
            <ul>
                {pokemonTeam.map((pokemon) => (
                    <li key={pokemon.id}>
                        {pokemon.name} - Level {pokemon.level}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamIndex;
