import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PokemonService, PokemonResponse } from '../src/pokemon/pokemon.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const validResponse: PokemonResponse = {
    name: 'pikachu',
    description: '',
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PokemonService)
      .useValue({
        getPokemon: (name) => {
          if (!name) {
            throw new Error('Name not retrieved!');
          }
          return Promise.resolve(validResponse);
        }
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/pokemon/:id (GET)', () => {
    it('should work', () => {
      return request(app.getHttpServer())
        .get('/pokemon/pikachu')
        .expect(200)
        .expect(validResponse);
    });

    it('should reject empty name', () => {
      return request(app.getHttpServer())
        .get('/pokemon/')
        .expect(404);
    });
  });

});
