import { PokeApiClient } from './poke-api.client';
import { mock, instance, when } from 'ts-mockito';
import { AxiosInstance } from 'axios';
import { Species } from './contracts';
import { getSpeciesResponse } from './fixture/species';

describe('PokeApiClient', () => {
  let provider: PokeApiClient;
  const axios: AxiosInstance = mock<AxiosInstance>();

  beforeEach(async () => {
    provider = new PokeApiClient(instance(axios));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get pokemon data', async () => {
    const pokemon = 'pikachu';
    const expectedResponse = JSON.parse(getSpeciesResponse());
    when(axios.get<Species>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)).thenResolve(
      {
        data: expectedResponse,
        status: 200,
        statusText: '',
        headers: {},
        config: {}
      }
    );
    expect(await provider.getSpecies(pokemon)).toEqual(expectedResponse);
  });
});
