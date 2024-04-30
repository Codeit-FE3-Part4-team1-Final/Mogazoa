'use client';

import classNames from 'classnames/bind';
import styles from './ProfileProductPanel.module.scss';
import ProfileProductCardList from '../ProfileProductCardList';
import useUserProductData from '@/hooks/useUserProductData';

const cx = classNames.bind(styles);

interface Props {
  userId: string;
}

export type UserProductCategory =
  | 'reviewed-products'
  | 'created-products'
  | 'favorite-products';

export default function ProfileProductPanel({ userId }: Props) {
  // TODO(이시열): 모바일 사이즈 타이틀 드롭다운
  // react-query: 무한스크롤
  const { userProductCategory, productCardItem, handleClickTitle } =
    useUserProductData(userId);

  return (
    <section className={cx('wrapper')}>
      <span className={cx('title-container')}>
        <span
          className={cx(
            'title',
            userProductCategory === 'reviewed-products' ? 'selected' : '',
          )}
          onClick={() => handleClickTitle('reviewed-products')}
        >
          리뷰 남긴 상품
        </span>
        <span
          className={cx(
            'title',
            userProductCategory === 'created-products' ? 'selected' : '',
          )}
          onClick={() => handleClickTitle('created-products')}
        >
          등록한 상품
        </span>
        <span
          className={cx(
            'title',
            userProductCategory === 'favorite-products' ? 'selected' : '',
          )}
          onClick={() => handleClickTitle('favorite-products')}
        >
          찜한 상품
        </span>
      </span>
      <ProfileProductCardList productCardItem={productCardItem} />
    </section>
  );
}
