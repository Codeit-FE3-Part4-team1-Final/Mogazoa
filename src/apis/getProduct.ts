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

type CategoryType =
  | '음악'
  | '영화/드라마'
  | '강의/책'
  | '호텔'
  | '가구/인테리어'
  | '식당'
  | '전자기기'
  | '화장품'
  | '의류/잡화'
  | '앱';

interface CategoryMetricInterface {
  favoriteCount: number;
  rating: number;
  reviewCount: number;
}

interface CategoryInterface {
  id: number;
  name: CategoryType;
}

interface DetailInterface {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  categoryId: number;
  categoryMetric: CategoryMetricInterface;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  description: string;
  category: CategoryInterface;
  isFavorite: boolean;
  favoriteCount: number;
}

export const getProduct = ({
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

export const getDetail = (productId: number): Promise<DetailInterface> => {
  const requestApi: RequestMethodInterface = {
    method: 'get',
    endPoint: `/products/${productId}`,
  };
  return requestMethod<DetailInterface>(requestApi);
};
