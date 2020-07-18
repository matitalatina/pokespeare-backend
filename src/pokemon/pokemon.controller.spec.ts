import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService, PokemonResponse } from './pokemon.service';
import { when, mock, instance } from 'ts-mockito';

describe('Pokemon Controller', () => {
  let controller: PokemonController;
  const service: PokemonService = mock(PokemonService);

  beforeEach(async () => {
    controller = new PokemonController(instance(service));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return pokemon', async () => {
    const pokemon = 'pikachu';
    const expectedResponse: PokemonResponse = {
      name: pokemon,
      description: '',
    }
    when(service.getPokemon(pokemon)).thenResolve(expectedResponse);
    expect(await controller.getPokemon(pokemon)).toEqual(expectedResponse);
  });
});
