import axios, { AxiosInstance, AxiosError } from 'axios';

export const AXIOS = 'AXIOS';

export function getAxiosInstance(): AxiosInstance {
  return axios.create({
    timeout: 5000,
  });
}

export function isAxiosError(x: any): x is AxiosError {
  return !!x.isAxiosError;
}
