import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './HomeProductCard.module.scss';
import { ProductListType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  productItem: ProductListType;
}

export default function HomeProductCard({ productItem }: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('product-thumbnail-box')}>
        <Image
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={productItem.image}
          alt='product-image'
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={cx('product-description')}>
        <span className={cx('product-title')}>{productItem.name}</span>
        <div className={cx('product-rating')}>
          <div className={cx('product-reply-like-box')}>
            <div className={cx('product-reply-like')}>
              <span className={cx('reply-like-text')}>리뷰</span>
              <span className={cx('reply-like-text')}>
                {productItem.reviewCount}
              </span>
            </div>
            <div className={cx('product-reply-like')}>
              <span className={cx('reply-like-text')}>찜</span>
              <span className={cx('reply-like-text')}>
                {productItem.favoriteCount}
              </span>
            </div>
          </div>
          <div className={cx('product-star-rating-box')}>
            <Image
              src={'/images/star-icon.svg'}
              alt='star-icon'
              width={16}
              height={16}
              className={cx('star-icon')}
            />
            <span className={cx('star-rating')}>{productItem.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
