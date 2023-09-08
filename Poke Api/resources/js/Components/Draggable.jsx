import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants.jsx';

function Draggable({ pokemon }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.POKEMON,
        item: { id: pokemon.id, name: pokemon.name, image: pokemon.image },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab', // Set cursor style when dragging
            }}
        >
            {/* Render the Pokémon */}
            <img src={pokemon.image} alt={pokemon.name} />
        </div>
    );
}

export default Draggable;
