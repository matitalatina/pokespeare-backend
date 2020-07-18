import { PokemonService } from './pokemon.service';
import { PokeApiClient } from './client/poke-api/poke-api.client';
import { ShakespeareClient } from './client/shakespeare/shakespeare.client';
import { mock, when, instance } from 'ts-mockito';
import { getSpeciesResponse } from './client/poke-api/fixture/species';
import { getTranslationResponse } from './client/shakespeare/fixture/translations';
import { NotFoundException } from '@nestjs/common';

describe('PokemonService', () => {
  let service: PokemonService;
  const pokeApi = mock(PokeApiClient);
  const shakespeare = mock(ShakespeareClient);

  beforeEach(async () => {
    service = new PokemonService(
      instance(pokeApi),
      instance(shakespeare),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reply with expected response', async () => {
    const pokemon = 'pikachu';
    const textToTranslate = 'translate';
    const translatedText = 'translated';
    when(pokeApi.getSpecies(pokemon)).thenResolve({
      ...JSON.parse(getSpeciesResponse()),
      flavor_text_entries: [
        {
          flavor_text: 'lingua italiana',
          language: { name: 'it', url: '' },
          version: { name: '', url: '' },
        },
        {
          flavor_text: textToTranslate,
          language: { name: 'en', url: '' },
          version: { name: '', url: '' },
        }]
    });
    when(shakespeare.translate(textToTranslate)).thenResolve(
      {
        ...JSON.parse(getTranslationResponse()),
        contents: {
          text: textToTranslate,
          translated: translatedText,
          translation: 'shakespeare',
        }
      }
    );

    expect(await service.getPokemon(pokemon)).toEqual({
      name: pokemon,
      description: translatedText,
    });
  });

  it('should raise not found if english pokemon text is not found', async () => {
    const pokemon = 'pikachu';
    when(pokeApi.getSpecies(pokemon)).thenResolve({
      ...JSON.parse(getSpeciesResponse()),
      flavor_text_entries: []
    });
    expect(service.getPokemon(pokemon)).rejects.toThrow(NotFoundException);
  });
});
