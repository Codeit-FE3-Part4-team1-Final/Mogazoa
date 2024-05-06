import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CompareCard.module.scss';
import { ProductListType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  productItem: ProductListType;
}

export default function CompareCard({ productItem }: Props) {
  return (
    <div
      className={cx('container')}
      style={{ backgroundImage: `url(${productItem.image})` }}
    >
      <div className={cx('blur')}>
        <div className={cx('products')}></div>
        <div className={cx('products', 'name')}>
          <span>{productItem.name}</span>
          <hr />
        </div>
        <br />
        <div className={cx('products', 'review-like')}>
          <span>리뷰</span>
          <span>{productItem.reviewCount}</span>
        </div>
        <br />
        <div className={cx('products', 'review-like')}>
          <span>찜</span>
          <span>{productItem.favoriteCount}</span>
        </div>
        <br />
        <div className={cx('products', 'review-like', 'rating')}>
          <Image
            src={'/images/star-icon.svg'}
            alt='star-icon'
            width={20}
            height={20}
            className={cx('star-icon')}
          />
          <span>{Number(productItem.rating.toFixed(1))}</span>
        </div>
        <br />
        <Link href={`/product/${productItem.id}`} className={cx('link')}>
          자세히보기
        </Link>
      </div>
    </div>
  );
}
