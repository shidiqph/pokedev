'use client'
import { useQuery } from '@apollo/client';
import { QD_POKEMON } from '@/lib/query';
import CardDetailPoke from '@/components/CardDetailPoke';
import { Card } from '@/components/ui/card';
export default function Detail({ params }) {
    const { loading, error, data } = useQuery(QD_POKEMON, {
        variables: { limit: 1, id: params.id },
    });
    if (loading) return (
        LoaderPokemon()
    );
    if (error) return <div className='flex text-center'>Error :(</div>;
    return (
        <div className="flex flex-col">
            <div className="grid gap-4 grid-cols-1">
                    {data && 
                        <div className="col-span-1">
                            <CardDetailPoke
                                name={data.pokemon_v2_pokemon[0].name}
                                image={data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites?.other?.home?.front_default}
                                categories={data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map(
                                    (type) => type.pokemon_v2_type.name
                                )}
                                type={data.pokemon_v2_pokemon[0]?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type?.name}
                                move={data.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonmoves? data.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves[0]?.pokemon_v2_move?.name : ''}
                            />
                        </div>
                }
            </div>
        </div>
    );
    
}
function LoaderPokemon() {
    return (
        <div className="grid grid-cols-1 mt-4 mb-4" >
                <div className="col-span-1">
                    <Card className="px-4 py-8 bg-primary animate-pulse h-auto min-h-[160px]" />
                </div>
        </div>
    );
}