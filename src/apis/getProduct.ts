/* eslint-disable no-useless-catch */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const httpMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

interface GetProductInterface {
  keyword?: string | null;
  category?: number | null;
  order?: 'recent' | 'rating' | 'reviewCount' | string;
  cursor?: number | null;
}

interface RequestApiInterface<U = unknown> {
  method: (typeof httpMethod)[keyof typeof httpMethod];
  endPoint: string;
  data?: U;
  config?: AxiosRequestConfig;
}

const axiosInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/3-1',
});

axiosInstance.interceptors.request.use(async (config) => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

async function Api<T = unknown, U = unknown>({
  method,
  endPoint,
  data,
  config,
}: RequestApiInterface<U>) {
  try {
    const response: AxiosResponse<T> = await axiosInstance({
      method,
      url: endPoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getProduct = ({
  keyword,
  category,
  order,
  cursor,
}: GetProductInterface) => {
  const queryParams = `?${keyword ? `&keyword=${keyword}` : ''}${category ? `&category=${category}` : ''}${order ? `&order=${order}` : ''}${cursor ? `&cursor=${cursor}` : ''}`;
  const requestApi: RequestApiInterface = {
    method: 'get',
    endPoint: `/products${queryParams}`,
  };
  return;
};
