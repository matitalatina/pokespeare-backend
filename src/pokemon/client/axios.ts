import axios, { AxiosInstance } from 'axios';

export const AXIOS = 'AXIOS';

export function getAxiosInstance(): AxiosInstance {
  return axios.create({
    timeout: 5000,
  });
}