import classNames from 'classnames/bind';
import { ProductListType } from '@/types/types';
import styles from './CommonMain.module.scss';
import DropDown from '@/components/DropDown';
import ProductCard from '@/components/Card/ProductCard';
import YouTubeEmbed from '@/components/YouTubeEmbeb/YouTubeEmbed';

interface MenuItem {
  key: string;
  label: string;
}

interface Props {
  sortTitle: string;
  selectedSort: string;
  onSelect: (sortType: string) => void;
  inputValue: string;
  products?: {
    list: ProductListType[];
    nextCursor: number;
  };
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
}: Props) {
  return (
    <main className={cx('main-wrapper')}>
      <section className={cx('banner')}>.</section>
      <div className={cx('line')} />
      <div className={cx('main-container')}>
        <section className={cx('all-product')}>
          <div className={cx('header')}>
            <p className={cx('title')}>
              {inputValue ? (
                <>
                  <span className={cx('title-point')}>{`'${inputValue}'`}</span>{' '}
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
          {products?.list ? (
            <div className={cx('product-list-grid')}>
              {products?.list.map((productItem) => (
                <ProductCard productItem={productItem} key={productItem.id} />
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </section>
        <div className={cx('line')} />
        <section className={cx('youtube-section')}>
          <p className={cx('title')}>제목제목제목</p>
          <YouTubeEmbed videoId='PM5K03g-04M' />
          <YouTubeEmbed videoId='JgrVNnU1c9w' />
        </section>
      </div>
    </main>
  );
}
