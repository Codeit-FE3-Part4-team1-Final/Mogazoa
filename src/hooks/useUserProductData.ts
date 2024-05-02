import { useLayoutEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';
import { ProductListType, SearchProductResponse } from '@/types/types';
import getUserProduct from '@/utils/getUserProduct';

const useUserProductData = (userId: string) => {
  const [userProductCategory, setUserProductCategory] =
    useState<UserProductCategory>('reviewed-products');
  const [productCardItem, setProductCardItem] = useState<ProductListType[]>();

  const handleClickTitle = (title: UserProductCategory) => {
    setUserProductCategory(title);
  };

  const { data: reviewedProduct } = useQuery<SearchProductResponse | undefined>(
    {
      queryKey: ['user-reviewed-products', userId],
      queryFn: () => getUserProduct(userId, 'reviewed-products'),
      staleTime: 60 * 3 * 1000,
    },
  );
  const { data: createdProduct } = useQuery<SearchProductResponse | undefined>({
    queryKey: ['user-created-products', userId],
    queryFn: () => getUserProduct(userId, 'created-products'),
    staleTime: 60 * 3 * 1000,
  });
  const { data: favoriteProduct } = useQuery<SearchProductResponse | undefined>(
    {
      queryKey: ['user-favorite-products', userId],
      queryFn: () => getUserProduct(userId, 'favorite-products'),
      staleTime: 60 * 3 * 1000,
    },
  );

  useLayoutEffect(() => {
    if (userProductCategory === 'reviewed-products') {
      setProductCardItem(reviewedProduct?.list);
    }
    if (userProductCategory === 'created-products') {
      setProductCardItem(createdProduct?.list);
    }
    if (userProductCategory === 'favorite-products') {
      setProductCardItem(favoriteProduct?.list);
    }
  }, [userProductCategory, reviewedProduct, createdProduct, favoriteProduct]);

  return { userProductCategory, productCardItem, handleClickTitle };
};

export default useUserProductData;
