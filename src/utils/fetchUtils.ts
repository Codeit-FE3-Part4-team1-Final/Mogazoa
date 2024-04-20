/* eslint-disable */

import { RequestMethodInterface } from '@/types/types';
import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/3-1/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const axiosGet = async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (e: any) {
    return e.response;
  }
};

export const axiosPostJson = async (url: string, body: any) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e: any) {
    return e.response;
  }
};

// FormData를 사용하여 멀티파트 폼 데이터를 보내는 요청
export const axiosPostFormData = async (url: string, body: any) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (e: any) {
    return e.response;
  }
};

export const axiosPut = async (url: string, body: any) => {
  try {
    const { data } = await axiosInstance.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e: any) {
    return e.response;
  }
};

export const axiosDelete = async (url: string) => {
  try {
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (e: any) {
    return `api delete error : ${e}`;
  }
};

const requestMethod = async <T = unknown, U = unknown>({
  method,
  endPoint,
  data,
  config,
}: RequestMethodInterface<U>): Promise<T> => {
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
};
