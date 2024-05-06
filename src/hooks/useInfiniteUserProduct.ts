import { debounce } from 'lodash';
import { useEffect } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';
import { SearchProductResponse } from '@/types/types';
import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';

const useInfiniteUserProduct = (
  userProductCategory: UserProductCategory,
  fetchNextReviewedProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >,
  fetchNextCreatedProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >,
  fetchNextFavoriteProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >,
) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (!isAtBottom) {
        return;
      }

      if (userProductCategory === 'created-products') {
        fetchNextCreatedProduct();
      }
      if (userProductCategory === 'favorite-products') {
        fetchNextFavoriteProduct();
      }
      if (userProductCategory === 'reviewed-products') {
        fetchNextReviewedProduct();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    fetchNextReviewedProduct,
    fetchNextCreatedProduct,
    fetchNextFavoriteProduct,
    userProductCategory,
  ]);
};

export default useInfiniteUserProduct;
