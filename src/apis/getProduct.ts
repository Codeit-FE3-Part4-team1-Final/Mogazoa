import { AxiosRequestConfig } from 'axios';

const httpMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

interface getProductInterface {
  keyword?: string | null;
  category?: number | null;
  order?: 'recent' | 'rating' | 'reviewCount' | string;
  cursor?: number | null;
  page?: number;
}

interface requestInterface<U = any> {
  method: (typeof httpMethod)[keyof typeof httpMethod];
  endpoint: string;
  data?: U;
  config?: AxiosRequestConfig;
}

const getProduct = ({
  keyword,
  category,
  order,
  cursor,
  page,
}: getProductInterface) => {
  const queryParams = `?${keyword ? `&keyword=${keyword}` : ''}${category ? `&category=${category}` : ''}${order ? `&order=${order}` : ''}${cursor ? `&cursor=${cursor}` : ''}`;
  const request: 
};
