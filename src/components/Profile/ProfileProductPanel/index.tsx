'use client';

import { useLayoutEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import styles from './ProfileProductPanel.module.scss';
import { ProductListType, SearchProductResponse } from '@/types/types';
import getUserProduct from '@/utils/getUserProduct';
import ProfileProductCardList from '../ProfileProductCardList';

const cx = classNames.bind(styles);

interface Props {
  userId: string;
}

export type UserProductCategory =
  | 'reviewed-products'
  | 'created-products'
  | 'favorite-products';

export default function ProfileProductPanel({ userId }: Props) {
  // TODO(이시열): 타이틀 선택(정렬), 테블릿, 모바일 사이즈 타이틀 드롭다운
  // react-query: 리뷰 남긴 상품, 등록한 상품, 찜한 상품 불러오기, 무한스크롤
  const [userProductCategory, setUserProductCategory] =
    useState<UserProductCategory>('reviewed-products');
  const [productCardItem, setProductCardItem] = useState<ProductListType[]>();

  const handleClickTitle = (title: UserProductCategory) => {
    setUserProductCategory(title);
  };

  const { data: createdProduct } = useQuery<SearchProductResponse>({
    queryKey: ['user-reviewed-products', userId],
    queryFn: () => getUserProduct(userId, 'reviewed-products'),
    staleTime: 60 * 3 * 1000,
  });
  const { data: reviewedProduct } = useQuery<SearchProductResponse>({
    queryKey: ['user-created-products', userId],
    queryFn: () => getUserProduct(userId, 'created-products'),
    staleTime: 60 * 3 * 1000,
  });
  const { data: favoriteProduct } = useQuery<SearchProductResponse>({
    queryKey: ['user-favorite-products', userId],
    queryFn: () => getUserProduct(userId, 'favorite-products'),
    staleTime: 60 * 3 * 1000,
  });

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

  return (
    <section className={cx('wrapper')}>
      <span className={cx('title-container')}>
        <span
          className={cx('title')}
          onClick={() => handleClickTitle('reviewed-products')}
        >
          리뷰 남긴 상품
        </span>
        <span
          className={cx('title')}
          onClick={() => handleClickTitle('created-products')}
        >
          등록한 상품
        </span>
        <span
          className={cx('title')}
          onClick={() => handleClickTitle('favorite-products')}
        >
          찜한 상품
        </span>
      </span>
      <ProfileProductCardList productCardItem={productCardItem} />
    </section>
  );
}
