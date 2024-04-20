import { ProductDetailType, RequestMethodInterface } from '@/types/types';
import { requestMethod } from '@/utils/fetchUtils';

const getProductDetail = (productId: number): Promise<ProductDetailType> => {
  const requestApi: RequestMethodInterface = {
    method: 'get',
    endPoint: `/products/${productId}`,
  };
  return requestMethod<ProductDetailType>(requestApi);
};

export default getProductDetail;
