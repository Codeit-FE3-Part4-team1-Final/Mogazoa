import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './CompareLoading.module.scss';

const cx = classNames.bind(styles);

export default function CompareLoading() {
  return (
    <div className={cx('container')}>
      <div className={cx('image-box')}>
        <Image
          src='/images/loading-L.svg'
          alt='로딩 아이콘'
          fill
          className={cx('image')}
        />
      </div>
      <span className={cx('span')}>상품을 등록해 보세요!</span>
    </div>
  );
}
