import classNames from 'classnames/bind';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';
import { SearchProductResponse } from '@/types/types';
import ProductCard from '@/components/Card/ProductCard';
import styles from './ProfileProductCardList.module.scss';
import { UserProductCategory } from '../ProfileProductPanel';
import useInfiniteUserProduct from '@/hooks/useInfiniteUserProduct';
import NoProduct from '@/components/Skeleton/NoProduct';

const cx = classNames.bind(styles);

interface Props {
  userProductCategory: UserProductCategory;
  productCardItem: SearchProductResponse[] | undefined;
  fetchNextReviewedProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >;
  fetchNextCreatedProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >;
  fetchNextFavoriteProduct: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<SearchProductResponse, unknown>,
      Error
    >
  >;
}

export default function ProfileProductCardList({
  userProductCategory,
  productCardItem,
  fetchNextReviewedProduct,
  fetchNextCreatedProduct,
  fetchNextFavoriteProduct,
}: Props) {
  useInfiniteUserProduct(
    userProductCategory,
    fetchNextReviewedProduct,
    fetchNextCreatedProduct,
    fetchNextFavoriteProduct,
  );
  return (
    <div className={cx('product-card-container')}>
      {(!productCardItem || productCardItem[0].list.length === 0) && (
        <NoProduct userProductCategory={userProductCategory} />
      )}
      {productCardItem?.map((productList) =>
        productList.list.map((product) => {
          return <ProductCard productItem={product} key={product.id} />;
        }),
      )}
    </div>
  );
}
