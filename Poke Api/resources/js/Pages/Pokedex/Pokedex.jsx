import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PokemonDetail from './PokemonDetail';
import { Link, usePage } from '@inertiajs/react';
import './tailwind.css';


function PokemonCard({ id, name, spriteURL, onClick }) {
    return (
        <li
            className="border-2 border-black rounded-lg p-4 m-4 text-center bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            <img src={spriteURL} alt={name} className="mx-auto mb-2 w-24 h-24" />
            <strong className="block text-2xl font-extrabold text-black">#{id} {name}</strong>
        </li>
    );
}

export default function Pokedex({ pokemonData, isLoading, previousPage, nextPage, auth, errors }) {
    const perPage = 20;
    const maxPageNumbersToShow = 5;

    const totalPages = Math.ceil(pokemonData.length / perPage);

    useEffect(() => {
        if (previousPage, nextPage) {
        }
    }, [previousPage, nextPage]);

    const [currentSlug, setCurrentSlug] = useState('page-1');
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handlePageChange = (newSlug) => {
        setCurrentSlug(newSlug);
    };

    const goToFirstPage = () => {
        const newSlug = 'page-1';
        handlePageChange(newSlug);
    };

    const goToLastPage = () => {
        const newSlug = `page-${totalPages}`;
        handlePageChange(newSlug);
    };

    const pageNumbers = [];
    const currentSlugNumber = parseInt(currentSlug.split('-')[1]);
    const startPage = Math.max(1, currentSlugNumber - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const selectPokemon = async (pokemon) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokemon details');
            }
            const pokemonDetails = await response.json();
            setSelectedPokemon(pokemonDetails);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };

    const closePokemonDetail = () => {
        setSelectedPokemon(null);
    };

    const handleSearch = async () => {
        setIsSearching(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            const pokemonData = await response.json();
            setSearchResults([pokemonData]);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} errors={errors}>
            <div className="centered-container bg-red-800 text-white p-4 border-2 border-black">
                <h2 className="text-4xl font-extrabold leading-tight text-center">
                    <Link href={route('pokedex.pokedex')}>Pokedex</Link>
                </h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search Pokémon"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                        style={{ color: 'black' }}
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-md"
                        disabled={isSearching}
                    >
                        Search
                    </button>
                </div>
                {isLoading ? (
                    <p className="mt-4 text-2xl">Loading...</p>
                ) : (
                    <>
                        {!selectedPokemon ? (
                            <div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((pokemonData, index) => (
                                            <PokemonCard
                                                key={index}
                                                id={pokemonData.id}
                                                name={pokemonData.name}
                                                spriteURL={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                                                onClick={() => selectPokemon(pokemonData)}
                                            />
                                        ))
                                    ) : (
                                        pokemonData
                                            .slice((currentSlugNumber - 1) * perPage, currentSlugNumber * perPage)
                                            .map((pokemon, index) => (
                                                <PokemonCard
                                                    key={index}
                                                    id={pokemon.id}
                                                    name={pokemon.name}
                                                    spriteURL={pokemon.imageURL}
                                                    onClick={() => selectPokemon(pokemon)}
                                                />
                                            ))
                                    )}
                                </ul>
                                <div className="mt-4 flex justify-center">
                                    <a
                                        href={`${previousPage}`}
                                        className="mx-2 p-2 bg-white text-black rounded-lg"
                                        disabled={currentSlugNumber === 1}
                                    >
                                        &#8249; Previous
                                    </a>
                                    {pageNumbers.map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(`page-${pageNumber}`)}
                                            className={`mx-2 p-2 ${
                                                currentSlugNumber === pageNumber
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-white text-black'
                                            } rounded-lg`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                    <a
                                        href={`/pokedex/${nextPage}`}
                                        className="mx-2 p-2 bg-white text-black rounded-lg"
                                        disabled={currentSlugNumber === totalPages}
                                    >
                                        Next &#8250;
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <PokemonDetail
                                auth={auth}
                                pokemonDetails={selectedPokemon}
                                onClose={closePokemonDetail}
                            />
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
