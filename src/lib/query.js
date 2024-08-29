'use client'
import { gql } from "@apollo/client";

export const Q_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
        id
        name
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
  }
`
export const QD_POKEMON = gql`
query GetDetailPokemon($limit: Int, $offset: Int, $id: Int) {
  pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {id: {_eq: $id}}) {
    id
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonmoves(order_by: {level: desc_nulls_last}, limit: 1) {
      pokemon_v2_move {
        name
      }
    }
  }
}
`