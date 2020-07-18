import { AxiosInstance } from 'axios';
import { instance, mock, when } from 'ts-mockito';
import { getTranslationResponse } from './fixture/translations';
import { ShakespeareClient } from './shakespeare.client';

describe('ShakespeareClient', () => {
  let provider: ShakespeareClient;
  const axios: AxiosInstance = mock<AxiosInstance>();

  beforeEach(async () => {
    provider = new ShakespeareClient(instance(axios));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get response from shakespeare service', async () => {
    const dataTranslate = `text=ciao%3Dmondo`;
    const expectedResponse = JSON.parse(getTranslationResponse());
    when(axios.post('https://api.funtranslations.com/translate/shakespeare.json', dataTranslate)).thenResolve(
      {
        data: expectedResponse,
        status: 200,
        statusText: '',
        headers: {},
        config: {}
      }
    );
    expect(await provider.translate('ciao=mondo')).toEqual(expectedResponse);
  })
});
