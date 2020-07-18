import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PokeApiClient } from './client/poke-api/poke-api.client';
import { ShakespeareClient } from './client/shakespeare/shakespeare.client';
import { isAxiosError } from './client/axios';

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
    try {
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
    } catch (e) {
      if (isAxiosError(e)) {
        switch (e.response.status) {
          case 404:
            throw new NotFoundException();
          default:
            throw new InternalServerErrorException();
        }
      }
      throw e;
    }

  }
}
