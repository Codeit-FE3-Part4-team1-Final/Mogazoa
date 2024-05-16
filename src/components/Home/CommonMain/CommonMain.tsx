/* eslint-disable */

import { InfiniteData } from '@tanstack/query-core';
import classNames from 'classnames/bind';
import styles from './CommonMain.module.scss';
import DropDown from '@/components/DropDown';
import ProductCard from '@/components/Card/ProductCard';
import YouTubeEmbed from '@/components/YouTubeEmbeb/YouTubeEmbed';
import CompareLoading from '@/components/Loading/CompareLoading';
import { useCallback, useRef } from 'react';
import TopScroll from '@/components/Button/TopScroll';

interface MenuItem {
  key: string;
  label: string;
}

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

interface Props {
  sortTitle: string;
  selectedSort: string;
  onSelect: (sortType: string) => void;
  inputValue: string;
  products?: InfiniteData<ProductListInterface, unknown>;
  fetchNextPageAll?: () => void;
  hasNextPageAll?: boolean;
}

const menuItems: MenuItem[] = [
  { key: 'reviewCount', label: '리뷰순' },
  { key: 'rating', label: '별점순' },
  { key: 'recent', label: '최신순' },
];

const cx = classNames.bind(styles);

export default function CommonMain({
  products,
  sortTitle,
  selectedSort,
  inputValue,
  onSelect,
  fetchNextPageAll,
  hasNextPageAll,
}: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPageAll) {
          fetchNextPageAll?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPageAll, hasNextPageAll],
  );

  return (
    <>
      <main>
        <div className={cx('main-container')}>
          <div className={cx('youtube-section')}>
            <section className={cx('youtube-wrapper')}>
              <div className={cx('youtube-first')}>
                <YouTubeEmbed videoId='PM5K03g-04M' />
              </div>
              <div className={cx('youtube-second')}>
                <YouTubeEmbed videoId='JgrVNnU1c9w' />
              </div>
            </section>
          </div>
          <div className={cx('line')} />
          <section className={cx('all-product')}>
            <div className={cx('header')}>
              <p className={cx('title')}>
                {inputValue ? (
                  <>
                    <span
                      className={cx('title-point')}
                    >{`'${inputValue}'`}</span>{' '}
                    검색상품
                  </>
                ) : (
                  <>
                    {' '}
                    <span
                      className={cx('title-point')}
                    >{`${sortTitle}`}</span>{' '}
                    상품
                  </>
                )}
              </p>
              <DropDown
                buttonLabel={selectedSort}
                dropItems={menuItems}
                onSelect={onSelect}
              />
            </div>
            {products?.pages ? (
              <div className={cx('product-list-grid')}>
                {products.pages.map((page) =>
                  page.list.map((productItem) => (
                    <ProductCard
                      productItem={productItem}
                      key={productItem.id}
                    />
                  )),
                )}
              </div>
            ) : (
              <div className={cx('loading-container')}>
                <CompareLoading />
              </div>
            )}
          </section>
          <div ref={lastProductElementRef} />
        </div>
      </main>
      <TopScroll />
    </>
  );
}
