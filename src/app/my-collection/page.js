'use client'

import React, {useState,useEffect} from 'react'
import ListPokemonCollection from "@/components/ListPokemonCollection";
import { useRouter } from 'next/navigation';

export default function MyCollection() {
    const router = useRouter();
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
        <h1 className="text-4xl font-bold">My Collection</h1>
        <p className="text-lg">Collection of your favorite Pokemon</p>
      </div>
      {hasCollection && <ListPokemonCollection />}
    </div>
  );
}