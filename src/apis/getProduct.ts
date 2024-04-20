import { GetQueryInterface, RequestMethodInterface } from '@/types/types';
import { requestMethod } from '@/utils/fetchUtils';

interface ProductInterface {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

interface ProductListInterface {
  nextCursor: number;
  list: ProductInterface[];
}

const getProduct = ({
  keyword,
  category,
  order,
  cursor,
}: GetQueryInterface) => {
  const queryParams = `?${keyword ? `&keyword=${keyword}` : ''}${category ? `&category=${category}` : ''}${order ? `&order=${order}` : ''}${cursor ? `&cursor=${cursor}` : ''}`;
  const requestApi: RequestMethodInterface = {
    method: 'get',
    endPoint: `/products${queryParams}`,
  };
  return requestMethod<ProductListInterface>(requestApi);
};

export default getProduct;
