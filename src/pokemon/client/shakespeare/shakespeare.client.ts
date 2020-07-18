import { Injectable, Inject } from '@nestjs/common';
import { AXIOS } from '../axios';
import { AxiosInstance } from 'axios';
import { ShakespeareResponse } from './contracts';
import { stringify } from 'qs';

@Injectable()
export class ShakespeareClient {
  constructor(
    @Inject(AXIOS) private readonly axios: AxiosInstance
  ) { }

  async translate(text: string): Promise<ShakespeareResponse> {
    const response = await this.axios.post<ShakespeareResponse>(
      'https://api.funtranslations.com/translate/shakespeare.json',
      stringify({ text })
    );
    return response.data;
  }
}
