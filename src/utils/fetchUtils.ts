import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  CreateProductRequestBody,
  CreateReviewRequestBody,
  FollowRequestBody,
  RequestMethodInterface,
  SignInRequestBody,
  SignInWithOauthRequestBody,
  SignUpRequestBody,
  SignUpWithOauthRequestBody,
  UpdateProductRequestBody,
  UpdateReviewRequestBody,
  UpdateUserRequestBody,
  UpsertOauthAppRequestBody,
  UrlType,
} from '@/types/types';

const axiosInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/2-2/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof localStorage === 'undefined') {
      return config;
    }

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

export const axiosGet = async (url: UrlType) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

export const axiosPostJson = async (
  url: UrlType,
  body:
    | CreateReviewRequestBody
    | CreateProductRequestBody
    | UpsertOauthAppRequestBody
    | FollowRequestBody
    | SignUpRequestBody
    | SignInRequestBody
    | SignInWithOauthRequestBody
    | SignUpWithOauthRequestBody,
) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

// FormData를 사용하여 멀티파트 폼 데이터를 보내는 요청
export const axiosPostFormData = async (url: UrlType, body: FormData) => {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

export const axiosPut = async (
  url: UrlType,
  body:
    | UpdateUserRequestBody
    | UpdateProductRequestBody
    | UpdateReviewRequestBody,
) => {
  try {
    const { data } = await axiosInstance.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

export const axiosDelete = async (url: UrlType, body?: FollowRequestBody) => {
  try {
    const config = body ? { data: body } : {};
    const { data } = await axiosInstance.delete(url, config);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    return error.response;
  }
};

export const requestMethod = async <T = unknown, U = unknown>({
  method,
  endPoint,
  data,
  config,
}: RequestMethodInterface<U>): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
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
