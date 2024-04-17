import classNames from 'classnames/bind';
import styles from './ProfileProductPanel.module.scss';

const cx = classNames.bind(styles);

export default function ProfileProductPanel() {
  return (
    <section className={cx('wrapper')}>
      <span className={cx('title-container')}>
        <span className={cx('title')}>리뷰 남긴 상품</span>
        <span className={cx('title')}>등록한 상품</span>
        <span className={cx('title')}>찜한 상품</span>
      </span>
      <div className={cx('product-card-container')}>
        {/* 임시 카드 */}
        <div className={cx('product-card')}></div>
        <div className={cx('product-card')}></div>
        <div className={cx('product-card')}></div>
        <div className={cx('product-card')}></div>
        <div className={cx('product-card')}></div>
        <div className={cx('product-card')}></div>
      </div>
    </section>
  );
}
