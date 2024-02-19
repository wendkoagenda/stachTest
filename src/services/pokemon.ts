// Need to use the React-specific entry point to import createApi
import { Pokemon } from "@/@types/Pokemon";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    // Modification de l'endpoint pour une requête GET sans paramètre
    getPokemon: builder.query<Pokemon, void>({
      query: () => `pokemon`,
    }),
  }),
});

// Export des hooks mis à jour
export const { useGetPokemonQuery } = pokemonApi;
