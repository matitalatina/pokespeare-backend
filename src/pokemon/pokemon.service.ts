import { Injectable, NotFoundException } from '@nestjs/common';
import { PokeApiClient } from './client/poke-api/poke-api.client';
import { ShakespeareClient } from './client/shakespeare/shakespeare.client';

export interface PokemonResponse {
  name: string,
  description: string,
}

@Injectable()
export class PokemonService {
  constructor(
    private readonly pokeApi: PokeApiClient,
    private readonly shakespeare: ShakespeareClient,
  ) { }
  async getPokemon(pokemon: string): Promise<PokemonResponse> {
    const lowerPokemon = pokemon.toLocaleLowerCase();
    const pokeResponse = await this.pokeApi.getSpecies(lowerPokemon);
    const textToTranslate = pokeResponse.flavor_text_entries.find(f => f.language.name === 'en');
    if (textToTranslate === undefined) {
      throw new NotFoundException();
    }
    const shakespeareResponse = await this.shakespeare.translate(textToTranslate.flavor_text);
    return {
      name: lowerPokemon,
      description: shakespeareResponse.contents.translated,
    };
  }
}
