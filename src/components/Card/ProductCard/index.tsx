import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

export default function ProductCard() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('product-thumbnail-box')}>
          <Image
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={'/images/product-example.png'}
            alt='product-image'
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={cx('product-description')}>
          <span className={cx('product-title')}>
            다이슨 슈퍼소닉 블루 아아아아아아아아
          </span>
          <div className={cx('product-rating')}>
            <div className={cx('product-reply-like-box')}>
              <div className={cx('product-reply-like')}>
                <span className={cx('reply-like-text')}>리뷰</span>
                <span className={cx('reply-like-text')}>129</span>
              </div>
              <div className={cx('product-reply-like')}>
                <span className={cx('reply-like-text')}>찜</span>
                <span className={cx('reply-like-text')}>34</span>
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
              <span className={cx('star-rating')}>4.7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
