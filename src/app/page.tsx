'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import classNames from 'classnames/bind';
import SideBar from '@/components/SideBar';
import styles from './page.module.scss';
import ProductCard from '@/components/Card/ProductCard';
import getProduct from '@/apis/getProduct.ts';
import { Category } from '@/types/types';

export default function Home() {
  const cx = classNames.bind(styles);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: hotProducts } = useQuery({
    queryKey: ['hotProducts'],
    queryFn: () => getProduct({ order: 'reviewCount' }),
  });

  const { data: topProducts } = useQuery({
    queryKey: ['topProducts'],
    queryFn: () => getProduct({ order: 'rating' }),
  });

  const { data: newProducts } = useQuery({
    queryKey: ['newProducts'],
    queryFn: () => getProduct({ order: 'recent' }),
  });

  return (
    <div className={cx('home-wrapper')}>
      <div className={cx('home-container')}>
        <aside className={cx('sidebar')}>
          <SideBar setSelectedCategory={setSelectedCategory} />
        </aside>
        <main className={cx('main')}>
          {selectedCategory === null ? (
            <div>
              <section className={cx('item-section')}>
                <p className={cx('item-header')}>
                  지금 <span className={cx('item-header-point')}>HOT</span> 상품
                </p>
                <div className={cx('itemList')}>
                  {hotProducts?.list.map((productItem) => (
                    <div className={cx('item')} key={productItem.id}>
                      <ProductCard productItem={productItem} />
                    </div>
                  ))}
                </div>
              </section>
              <section className={cx('item-section')}>
                <p className={cx('item-header')}>
                  별점 <span className={cx('item-header-point')}>TOP</span> 상품
                </p>
                <div className={cx('itemList')}>
                  {topProducts?.list?.map((productItem) => (
                    <div className={cx('item')} key={productItem.id}>
                      <ProductCard productItem={productItem} />
                    </div>
                  ))}
                </div>
              </section>
              <section className={cx('item-section')}>
                <p className={cx('item-header')}>
                  <span className={cx('item-header-point')}>NEW </span>등록 상품
                </p>
                <div className={cx('itemList')}>
                  {newProducts?.list?.map((productItem) => (
                    <div className={cx('item')} key={productItem.id}>
                      <ProductCard productItem={productItem} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div>{selectedCategory.id}</div>
          )}
        </main>
        <section className={cx('ranking-section')}>리뷰어 랭킹</section>
      </div>
    </div>
  );
}
