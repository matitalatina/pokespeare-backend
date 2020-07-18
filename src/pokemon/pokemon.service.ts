import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { PokeApiClient } from './client/poke-api/poke-api.client';
import { ShakespeareClient } from './client/shakespeare/shakespeare.client';
import { isAxiosError } from './client/axios';
import { TooManyRequestsException } from './client/errors/TooManyRequests';

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
          case 429:
            throw new TooManyRequestsException();
          default:
            console.error('AxiosError: ', e, e.message, e.stack);
            throw new InternalServerErrorException();
        }
      }
      console.error(e, e.message, e.stack);
      throw e;
    }

  }
}
