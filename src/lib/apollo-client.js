import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_URL } from './api';

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    pokemon_v2_pokemon: {
                        keyArgs: [],
                        merge(existing = [], incoming, { args: { offset = 0 } }) {
                            const merged = existing ? existing.slice(0) : [];
                            incoming.forEach((item, index) => {
                                merged[offset + index] = item;
                            });
                            return merged;
                        },
                    },
                },
            },
        },
    }),
})

export default client;