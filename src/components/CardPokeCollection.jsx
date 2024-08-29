'use client'
import { Card } from '@/components/ui/card'
import theme from '@/styles/theme'
import Image from 'next/image'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';

function CardPoke({ name, image, type = "unknown", categories = [] }) {
    const router = useRouter();
    const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    const getFibonacci = (n) => {
        if (n <= 0) return 0;
        if (n === 1) return 1;

        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            const next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
    const handleRelease = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1; 
        if (isPrime(randomNumber)) {
            const currentCollection = JSON.parse(localStorage.getItem('my-collection')) || [];
            const updatedCollection = currentCollection.filter(pokemon => pokemon.name !== name);
            localStorage.setItem('my-collection', JSON.stringify(updatedCollection));
            alert(`${name} has been released successfully!`);
            window.location.reload();
        } else {
            alert(`Failed to release ${name}. Try again!`);
        }
    }
    const handleRename = () => {
        const currentCollection = JSON.parse(localStorage.getItem('my-collection')) || [];

        const pokemonIndex = currentCollection.findIndex(pokemon => pokemon.name === name);

        if (pokemonIndex !== -1) {
            const originalName = currentCollection[pokemonIndex].originalName || name; 
            const renameCount = currentCollection[pokemonIndex].renameCount || 0; 
            const fibonacciNumber = getFibonacci(renameCount); 
            
            const newName = `${originalName}-${fibonacciNumber}`; 

            currentCollection[pokemonIndex] = {
                ...currentCollection[pokemonIndex],
                name: newName,
                originalName: originalName, 
                renameCount: renameCount + 1 
            };

            localStorage.setItem('my-collection', JSON.stringify(currentCollection));
            alert(`${originalName} has been renamed to ${newName}!`);
            
            window.location.reload();
        }
    }
    useEffect(() => {
        const storedCollection = localStorage.getItem('my-collection');
        if (storedCollection) {
            const parsedCollection = JSON.parse(storedCollection);
            if (parsedCollection.length === 0) {
                router.push('/');
            } 
        } else {
            router.push('/');
        }
    }, [router]);
    return (
        <Card className={`px-4 py-8 h-auto cursor-pointer min-h-[160px] overflow-hidden ${theme.cardVariants[type]}`}>
            <div className="flex flex-wrap relative">
                <div className="w-full font-bold text-white text-lg capitalize">{name}</div>
                <div className="flex-col opacity-60">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-white mt-2 px-3 py-1 rounded-full font-semibold text-[10px] text-center capitalize">{category}</div>
                    ))}
                </div>
                <div className="w-full">
                <div className="grid grid-cols-2 gap-3 z-9999 mt-20">
                    <button className="bg-white rounded-sm font-bold text-[12px] mt-4 px-3 py-1 text-center capitalize hover:bg-opacity-50" onClick={handleRename}>
                        Rename
                    </button>
                    <button className="bg-rose-600 text-white rounded-sm font-bold text-[12px] mt-4 px-3 py-1 text-center capitalize hover:bg-opacity-50" onClick={handleRelease}>
                        Release
                    </button>
                </div>
                </div>
                <Image src="/pokeball.svg" alt="pokeball" className='absolute -right-10 top-6 opacity-50' width={140} height={140} />
                {image && <Image src={image} alt={`Image ${name}`} className='absolute right-0 -top-6' width={140} height={140} />}
            </div>
        </Card>
    )

}
export default CardPoke