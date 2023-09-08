import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import './Pokedex/tailwind.css'; // Import Tailwind CSS

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pokedex!</h2>}>
            <Head title="Dashboard" />

            <div className="bg-red-700 min-h-screen py-8" style={{ backgroundColor: '#991B1B' }}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <p>You're logged in!</p>
                                <h1 className="font-bold text-gray-900">Trainers, Welkom!</h1>
                                <p>Op onze Pokedex-website kun je de uitgebreide wereld van Pokémon verkennen. Ontdek en verzamel Pokémon-gegevens, stel je eigen droomteam samen en beheer je trainerprofiel. Geniet van het avontuur en word de ultieme Pokémon-meester! Veel plezier!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
