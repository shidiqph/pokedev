'use client'
import { Card } from '@/components/ui/card'
import theme from '@/styles/theme'
import Image from 'next/image'
import React from 'react'

function CardPoke({ name, image, type = "unknown", categories = [] }) {
    return (
        <Card className={`px-4 py-8 h-auto cursor-pointer min-h-[160px] overflow-hidden ${theme.cardVariants[type]}`}>
            <div className="flex flex-wrap relative">
                <div className="w-full font-bold text-white text-lg capitalize">{name}</div>
                <div className="flex-col opacity-60">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-white mt-2 px-3 py-1 rounded-full font-semibold text-[10px] text-center capitalize">{category}</div>
                    ))}
                </div>
                <Image src="/pokeball.svg" alt="pokeball" className='absolute -right-10 top-6 opacity-50' width={140} height={140} />
                {image && <Image src={image} alt={`Image ${name}`} className='absolute right-0 -top-6' width={140} height={140} />}
            </div>
        </Card>
    )

}
export default CardPoke