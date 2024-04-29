'use client';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { ProductListType } from '@/types/types';
import handleErrorImage from '@/utils/handleErrorImage';

const cx = classNames.bind(styles);

interface Props {
  productItem: ProductListType;
}

export default function ProductCard({ productItem }: Props) {
  return (
    <Link href={`/product/${productItem.id}`} className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('product-thumbnail-box')}>
          <Image
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={
              productItem.image.includes('example')
                ? '/images/profile-image.png'
                : productItem.image
            }
            alt='product-image'
            style={{ objectFit: 'contain' }}
            onError={(e) => handleErrorImage(e)}
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
              <span className={cx('star-rating')}>
                {Number(productItem.rating.toFixed(1))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
