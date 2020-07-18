import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokeApiClient } from './client/poke-api/poke-api.client';
import { getAxiosInstance, AXIOS } from './client/axios';
import { ShakespeareClient } from './client/shakespeare/shakespeare.client';

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokeApiClient,
    { provide: AXIOS, useValue: getAxiosInstance() },
    ShakespeareClient
  ]
})
export class PokemonModule { }
