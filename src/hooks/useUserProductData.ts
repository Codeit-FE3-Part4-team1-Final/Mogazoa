import { useLayoutEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';
import { SearchProductResponse } from '@/types/types';
import getUserProduct from '@/utils/getUserProduct';

const useUserProductData = (userId: string) => {
  const [userProductCategory, setUserProductCategory] =
    useState<UserProductCategory>('reviewed-products');
  const [productCardItem, setProductCardItem] = useState<
    SearchProductResponse[] | undefined
  >(undefined);

  const handleClickTitle = (title: UserProductCategory) => {
    setUserProductCategory(title);
  };

  const { data: reviewedProduct, fetchNextPage: fetchNextReviewedProduct } =
    useInfiniteQuery({
      queryKey: ['user-reviewed-products', userId],
      queryFn: ({ pageParam }) =>
        getUserProduct(userId, pageParam, 'reviewed-products'),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      staleTime: 60 * 1000,
    });

  const { data: createdProduct, fetchNextPage: fetchNextCreatedProduct } =
    useInfiniteQuery({
      queryKey: ['user-created-products', userId],
      queryFn: ({ pageParam }) =>
        getUserProduct(userId, pageParam, 'created-products'),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      staleTime: 60 * 1000,
    });

  const { data: favoriteProduct, fetchNextPage: fetchNextFavoriteProduct } =
    useInfiniteQuery({
      queryKey: ['user-favorite-products', userId],
      queryFn: ({ pageParam }) =>
        getUserProduct(userId, pageParam, 'favorite-products'),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      staleTime: 60 * 1000,
    });

  useLayoutEffect(() => {
    if (userProductCategory === 'reviewed-products') {
      setProductCardItem(reviewedProduct?.pages);
    }
    if (userProductCategory === 'created-products') {
      setProductCardItem(createdProduct?.pages);
    }
    if (userProductCategory === 'favorite-products') {
      setProductCardItem(favoriteProduct?.pages);
    }
  }, [userProductCategory, reviewedProduct, createdProduct, favoriteProduct]);

  return {
    userProductCategory,
    productCardItem,
    handleClickTitle,
    fetchNextReviewedProduct,
    fetchNextCreatedProduct,
    fetchNextFavoriteProduct,
  };
};

export default useUserProductData;
