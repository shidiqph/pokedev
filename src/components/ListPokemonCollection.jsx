'use client'
import CardPokeCollection from './CardPokeCollection';
import { Card } from './ui/card';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ListPokemonCollection() {
    const router = useRouter();
    const [pokemonCollection, setPokemonCollection] = useState([]); 

    useEffect(() => {
        const storedCollection = localStorage.getItem('my-collection');
        if (storedCollection) {
            const parsedCollection = JSON.parse(storedCollection);
            if (parsedCollection.length === 0) {
                router.push('/');
            } else {
                setPokemonCollection(parsedCollection);
            }
        } else {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex flex-col gap-4 mt-5">
            {pokemonCollection.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {pokemonCollection.map((pokemon, index) => (
                        <div className="col-span-1" key={index}>
                            <CardPokeCollection
                                name={pokemon.name}
                                image={pokemon.image}
                                categories={pokemon.categories}
                                type={pokemon.type}
                                move={pokemon.move}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <LoaderPokemon /> 
            )}
        </div>
    );
}

function LoaderPokemon() {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 mb-4">
            {[...Array(4)].map((_, index) => (
                <div className="col-span-1" key={`loader-${index}`}>
                    <Card className="px-4 py-8 bg-primary animate-pulse h-auto min-h-[160px]" />
                </div>
            ))}
        </div>
    );
}
