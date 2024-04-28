'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Production from '@/components/Production';
import ProductionStatics from '../../../components/ProductionStatics';
import ProductionReview from '@/components/ProductionReview';
import cx from '@/app/product/[productId]/cx.ts';
import DropDown from '@/components/DropDown';
import { ProductDetailType } from '@/types/types.ts';

interface MenuItem {
  key: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { key: 'recent', label: '최신순' },
  { key: 'ratingDesc', label: '별점 높은순' },
  { key: 'ratingAsc', label: '별점 낮은순' },
  { key: 'likeCount', label: '좋아요순' },
];

const fetchProductData = async (
  productId: string,
): Promise<ProductDetailType> => {
  const response = await fetch(
    `https://mogazoa-api.vercel.app/3-1/products/${productId}`,
  );
  if (!response.ok) {
    throw new Error('Server error occurred');
  }
  return response.json();
};

export default function ProductPage({
  params,
}: Readonly<{
  params: { productId: string };
}>) {
  const [order, setOrder] = useState('recent');
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery<ProductDetailType, Error>({
    queryKey: ['productData', params.productId],
    queryFn: () => fetchProductData(params.productId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !productData) {
    return <div>An error occurred</div>;
  }

  const handleSelect = (newValue: string) => {
    setOrder(newValue);
  };

  return (
    <main>
      <section className={cx('section-container')}>
        <Production productData={productData} />
      </section>

      <section className={cx('section-container')}>
        <div className={cx('section-header')}>상품 통계</div>
        <ProductionStatics productData={productData} />
      </section>

      <section className={cx('section-container')}>
        <div className={cx('section-header')}>
          상품 리뷰
          <DropDown
            buttonLabel={order}
            dropItems={menuItems}
            onSelect={handleSelect}
          />
        </div>
        <ProductionReview />
      </section>
    </main>
  );
}
