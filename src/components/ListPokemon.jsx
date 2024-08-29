'use client'
import CardPoke from './CardPoke';
import { useQuery } from '@apollo/client';
import { Q_POKEMONS } from '@/lib/query';
import { Card } from './ui/card';
import InfiniteScroll from 'react-infinite-scroller'
import { useRouter } from 'next/navigation';

export default function ListPokemon() {
    const router = useRouter();

    const { loading, error, data, fetchMore } = useQuery(Q_POKEMONS, {
        variables: { limit: 8, offset: 0 },
    });
    if (loading) return (
        LoaderPokemon()
    );
    if (error) return <div className='flex text-center'>Error :(</div>;
    return (
        <div className="flex flex-col gap-4 mt-5">
            <InfiniteScroll
                pageStart={0}
                loadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data?.pokemon_v2_pokemon?.length,
                        },
                    })
                }
                hasMore={true}
                loader={
                    LoaderPokemon()
                }
            >
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {data?.pokemon_v2_pokemon.map((pokemon, index) => (
                        <div className="col-span-1" key={index} onClick={() => router.push(`/pokemon/${pokemon.id}`)}>
                            <CardPoke
                                name={pokemon.name}
                                image={pokemon.pokemon_v2_pokemonsprites[0].sprites?.other?.home?.front_default}
                                categories={pokemon.pokemon_v2_pokemontypes.map(
                                    (type) => type.pokemon_v2_type.name
                                )}
                                type={pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type?.name}
                            />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
function LoaderPokemon() {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 mb-4" key={0}>
            {[...Array(4)].map((_, index) => (
                <div className="col-span-1" key={`loader-` + index}>
                    <Card className="px-4 py-8 bg-primary animate-pulse h-auto min-h-[160px]" />
                </div>
            ))}
        </div>
    );
}