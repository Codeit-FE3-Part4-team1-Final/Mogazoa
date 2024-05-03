import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ProductListType } from '@/types/types';
import styles from './CompareCard.module.scss';

const cx = classNames.bind(styles);

interface Props {
  productItem: ProductListType;
}

export default function CompareCard({ productItem }: Props) {
  return (
    <div className={cx('container')}>
      <div className={cx('card')}>
        <div className={cx('image-container')}>
          <Image
            src={productItem.image}
            alt='product-image'
            width={200}
            height={200}
            className={cx('image')}
          />
        </div>
        <div className={cx('content-container')}>
          <h2>{productItem.name}</h2>
          <div className={cx('review-container')}>
            <h3>리뷰 :</h3>
            <span>{productItem.reviewCount}</span>
          </div>
          <div className={cx('like-container')}>
            <h3>찜 :</h3>
            <span>{productItem.favoriteCount}</span>
          </div>
          <div className={cx('rating-container')}>
            <Image
              src={'/images/star-icon.svg'}
              alt='star-icon'
              width={16}
              height={16}
              className={cx('star-icon')}
            />
            <span>{productItem.rating}</span>
          </div>
          <Link href={`/product/${productItem.id}`} className={cx('link')}>
            자세히보기
          </Link>
        </div>
      </div>
    </div>
  );
}
