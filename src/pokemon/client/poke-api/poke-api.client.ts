import { Injectable, Inject } from '@nestjs/common';
import { Species } from './contracts';
import { AXIOS } from '../axios';
import { AxiosInstance } from 'axios';

@Injectable()
export class PokeApiClient {
  constructor(
    @Inject(AXIOS) private readonly axios: AxiosInstance,
  ) { }

  async getSpecies(pokemon: string): Promise<Species> {
    const response = await this.axios.get<Species>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
    return response.data;
  }
}
