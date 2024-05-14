import Slider from 'react-slick';
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

interface Props {
  sortTitle: string;
  selectedSort: string;
  onSelect: (sortType: string) => void;
  selectedCategory: Category | null;
  inputValue: string;
  categoryProducts?: {
    list: ProductListType[];
    nextCursor: number;
  };
  sortProducts?: {
    list: ProductListType[];
    nextCursor: number;
  };
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
}: Props) {
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
        {categoryProducts?.list ? (
          <div className={cx('product-list-grid')}>
            {categoryProducts?.list.map((productItem) => (
              <ProductCard key={productItem.id} productItem={productItem} />
            ))}
          </div>
        ) : (
          <div className={cx('loading-container')}>
            <CompareLoading />
          </div>
        )}
      </section>
    </div>
  );
}
