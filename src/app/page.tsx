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
        <aside className={cx('sidebar')}>
          <SideBar />
        </aside>
        <main className={cx('main')}>
          <section className={cx('item-section')}>
            <p className={cx('item-header')}>
              지금 <span className={cx('item-header-point')}>HOT</span> 상품
            </p>
            <div className={cx('itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
          <section className={cx('item-section')}>
            <p className={cx('item-header')}>
              별점 <span className={cx('item-header-point')}>TOP</span> 상품
            </p>
            <div className={cx('itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
          <section className={cx('item-section')}>
            <p className={cx('item-header')}>
              <span className={cx('item-header-point')}>NEW </span>등록 상품
            </p>
            <div className={cx('itemList')}>
              {productItems.map((productItem, index) => (
                <div className={cx('item')}>
                  <ProductCard key={index} productItem={productItem} />
                </div>
              ))}
            </div>
          </section>
        </main>
        <section className={cx('ranking-section')}>리뷰어 랭킹</section>
      </div>
    </div>
  );
}
