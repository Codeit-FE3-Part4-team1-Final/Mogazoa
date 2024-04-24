import classNames from 'classnames/bind';
import SideBar from '@/components/SideBar';
import styles from './page.module.scss';
import ProductCard from '@/components/Card/ProductCard';
import productItems from './test.ts';

export default function Home() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('home-wrapper')}>
      <div className={cx('home-container')}>
        <aside className={cx('aside')}>
          <SideBar />
        </aside>
        <main className={cx('main')}>
          <section className={cx('hot-item-section')}>
            <p className={cx('hot-item-header')}>
              지금 <span className={cx('hot-item-header-point')}>HOT</span> 상품
            </p>
            <div className={cx('hot-itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('hot-item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
          <section className={cx('hot-item-section')}>
            <p className={cx('hot-item-header')}>
              별점 <span className={cx('hot-item-header-point')}>TOP</span> 상품
            </p>
            <div className={cx('hot-itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('hot-item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
          <section className={cx('hot-item-section')}>
            <p className={cx('hot-item-header')}>
              <span className={cx('hot-item-header-point')}>NEW </span>등록 상품
            </p>
            <div className={cx('hot-itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('hot-item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
        </main>
        <section className={cx('ranking-section')}>랭킹 정보 구역</section>
      </div>
    </div>
  );
}
