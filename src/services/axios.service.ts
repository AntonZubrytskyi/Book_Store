import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseURL } from '../constants';

const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use((config: AxiosRequestConfig) => config);

export type Response<T> = Promise<AxiosResponse<T>>;

export {
  axiosService,
};
