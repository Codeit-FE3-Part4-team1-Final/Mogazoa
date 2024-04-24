'use client';

import { useState } from 'react';
import Production from '@/components/Production';
import ProductionStatics from '../../../components/ProductionStatics';
import { ProductDetailType } from '@/types/types.ts';
import ProductionReview from '@/components/ProductionReview';
import cx from '@/app/product/[productId]/cx.ts';
import DropDown from '@/components/DropDown';

const productData: ProductDetailType = {
  id: 1,
  name: '소니 블루투스 헤드셋 WH-CH720N',
  description: '노이즈 캔슬링이 잘 되는 이어폰',
  image:
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000',
  rating: 4.6,
  reviewCount: 90,
  favoriteCount: 1000,
  categoryId: 1,
  createdAt: '2024-04-04T03:55:14.623Z',
  updatedAt: '2024-04-04T03:55:14.623Z',
  writerId: 1,
  isFavorite: false,
  category: {
    id: 1,
    name: '전자기기',
  },
  categoryMetric: {
    rating: 4.5,
    favoriteCount: 1000,
    reviewCount: 100,
  },
};
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

export default function ProductPage() {
  const [order, setOrder] = useState('recent');

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
