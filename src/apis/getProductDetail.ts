/* eslint-disable prefer-promise-reject-errors */
import { ProductDetailType, RequestMethodInterface } from '@/types/types';
import { requestMethod } from '@/utils/fetchUtils';

const getProductDetail = (productId: number): Promise<ProductDetailType> => {
  if (productId === 0) {
    return Promise.reject('Default ProductId');
  }

  const requestApi: RequestMethodInterface = {
    method: 'get',
    endPoint: `products/${productId}`,
  };
  return requestMethod<ProductDetailType>(requestApi);
};

export default getProductDetail;
