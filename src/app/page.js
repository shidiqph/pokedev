'use client'

import React, {useState,useEffect} from 'react'
import ListPokemon from "@/components/ListPokemon";

export default function Home() {
  const [hasCollection, setHasCollection] = useState(false);
  useEffect(() => {
    const collection = localStorage.getItem('my-collection');
    if (collection && JSON.parse(collection).length > 0) {
        setHasCollection(true);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="text-center mb-8 col-span-1 md:col-span-2 lg:col-span-4">
        <h1 className="text-4xl font-bold">Welcome to Pokédex</h1>
        <p className="text-lg">The best place to find your favorite Pokemon</p>
        {hasCollection && <a href="/my-collection" className="text-blue-500">See My Collection</a>}
      </div>
      <ListPokemon />
    </div>
  );
}