import { Controller, Get, Param, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { PokemonResponse, PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseInterceptors(CacheInterceptor)
export class PokemonController {
  constructor(
    private readonly service: PokemonService,
  ) { }

  @Get(':name')
  async getPokemon(@Param('name') pokemon: string): Promise<PokemonResponse> {
    return await this.service.getPokemon(pokemon);
  }
}
