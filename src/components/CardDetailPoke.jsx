'use client'
import { Card } from '@/components/ui/card'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import theme from '@/styles/theme'
import Image from 'next/image'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';

function CardDetailPoke({ name, image, type = "unknown", categories = [], move }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); 

    const handleCatch = () => {
        setIsLoading(true); 
        setTimeout(() => { 
            const success = Math.random() < 0.5; 

            if (success) {
                const currentCollection = JSON.parse(localStorage.getItem('my-collection')) || [];
                const newEntry = { name, image, type, categories, move };
                currentCollection.push(newEntry);
                
                localStorage.setItem('my-collection', JSON.stringify(currentCollection));
                
                alert('Catch successful!');
                router.push('/my-collection');
            } else {
                alert('Catch failed. Try again!');
            }

            setIsLoading(false); 
        }, 1000); 
    };
    return (
        <Card className={`px-4 py-8 h-auto cursor-pointer min-h-[160px] overflow-hidden my-auto ${theme.cardVariants[type]}`}>
            <div className="flex flex-wrap relative">
            {image && <Image src={image} alt={`Image ${name}`} className='text-center m-auto z-50' width={200} height={200} />}

                <div className="w-full font-bold text-white text-4xl capitalize mt-6">{name}</div>
                <div className="w-full font-bold text-white text-xl capitalize mt-4">Category</div>
                <div className="flex w-full gap-2 opacity-60">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-white mt-2 px-3 py-1 rounded-full font-semibold text-[10px] text-center capitalize">{category}</div>
                    ))}
                </div>
                <Image src="/pokeball.svg" alt="pokeball" className='absolute -right-10 top-6 opacity-50' width={200} height={200} />
                {move &&
                    <div className='flex-col'>
                        <div className="w-full font-bold text-white text-xl capitalize mt-4">Move</div>
                        <div className="opacity-60 bg-white mt-2 px-3 py-1 rounded-full font-semibold text-[10px] text-center capitalize">{move}</div>
                    </div>
                }
                <div className="grid grid-cols-6 w-full gap-4">
                <button className="bg-white col-span-2 rounded-xl font-bold text-[16px] mt-4 px-3 py-2 text-center capitalize hover:bg-opacity-50" onClick={()=> router.push('/')}>
                    Back
                </button>
                <button className="bg-slate-700 text-white col-span-4 rounded-xl font-bold text-[16px] mt-4 px-3 py-2 text-center capitalize hover:bg-opacity-50" onClick={()=>handleCatch()}>
                    Catch!
                </button>
            </div>
            </div>
            {isLoading && <LoadingSpinner />}
        </Card>
    )
}
export default CardDetailPoke