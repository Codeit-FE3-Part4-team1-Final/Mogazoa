import { useCallback, useRef } from 'react';
import Slider from 'react-slick';
import { InfiniteData } from '@tanstack/query-core';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import classNames from 'classnames/bind';
import styles from './CategoryMain.module.scss';
import DropDown from '@/components/DropDown';
import ProductCard from '@/components/Card/ProductCard';
import { Category, ProductListType } from '@/types/types';
import CompareLoading from '@/components/Loading/CompareLoading';

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
  selectedCategory: Category | null;
  inputValue: string;
  sortProducts?: {
    list: ProductListType[];
    nextCursor: number;
  };
  categoryProducts?: InfiniteData<ProductListInterface, unknown>;
  fetchNextPageCategory: () => void;
  hasNextPageCategory: boolean;
}

const cx = classNames.bind(styles);

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1028,
      settings: {
        slidesToShow: 2.7,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1.9,
      },
    },
  ],
};

const menuItems: MenuItem[] = [
  { key: 'reviewCount', label: '리뷰순' },
  { key: 'rating', label: '별점순' },
  { key: 'recent', label: '최신순' },
];

export default function CategoryMain({
  sortTitle,
  selectedSort,
  onSelect,
  selectedCategory,
  inputValue,
  categoryProducts,
  sortProducts,
  fetchNextPageCategory,
  hasNextPageCategory,
}: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPageCategory) {
          fetchNextPageCategory?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPageCategory, hasNextPageCategory],
  );
  return (
    <div className={cx('main-container')}>
      <section className={cx('product-info')}>
        <div className={cx('header')}>
          <p className={cx('title')}>
            <span className={cx('title-point')}>{sortTitle} </span>
            상품
          </p>
          <DropDown
            buttonLabel={selectedSort}
            dropItems={menuItems}
            onSelect={onSelect}
          />
        </div>
        <div className={cx('itemList')}>
          {sortProducts?.list ? (
            <Slider
              {...settings}
              key={selectedCategory ? selectedCategory.name : 'default'}
            >
              {sortProducts?.list.map((productItem) => (
                <div className={cx('item')} key={productItem.id}>
                  <ProductCard productItem={productItem} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className={cx('loading-container')}>
              <CompareLoading />
            </div>
          )}
        </div>
      </section>
      <div className={cx('line')} />
      <section className={cx('all-product')}>
        <div className={cx('header')}>
          <p className={cx('title')}>
            <span className={cx('title-point')}>{selectedCategory?.name} </span>
            {inputValue ? `'${inputValue}' 검색상품` : '전체 상품'}
          </p>
        </div>
        {categoryProducts?.pages ? (
          <div className={cx('product-list-grid')}>
            {categoryProducts.pages.map((page) =>
              page.list.map((productItem) => (
                <ProductCard key={productItem.id} productItem={productItem} />
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
  );
}
