import { Controller, Get, Param } from '@nestjs/common';
import { PokemonResponse, PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly service: PokemonService,
  ) { }

  @Get(':name')
  async getPokemon(@Param('name') pokemon: string): Promise<PokemonResponse> {
    return await this.service.getPokemon(pokemon);
  }
}
