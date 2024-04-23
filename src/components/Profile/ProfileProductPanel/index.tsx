import classNames from 'classnames/bind';
import styles from './ProfileProductPanel.module.scss';
import ProductCard from '@/components/Card/ProductCard';
import { ProductListType } from '@/types/types';

const cx = classNames.bind(styles);

// 임시 product 데이터
const productItem: ProductListType = {
  updatedAt: '2024-04-23T04:03:04.169Z',
  createdAt: '2024-04-23T04:03:04.169Z',
  writerId: 1,
  categoryId: 1,
  favoriteCount: 0,
  reviewCount: 0,
  rating: 0,
  image: '/images/product-example.png',
  name: '제품 이름은 1자 부터 20자 입니다',
  id: 1,
};

export default function ProfileProductPanel() {
  // TODO(이시열): 타이틀 선택(정렬), 테블릿, 모바일 사이즈 타이틀 드롭다운
  // react-query: 리뷰 남긴 상품, 등록한 상품, 찜한 상품 불러오기, 무한스크롤
  return (
    <section className={cx('wrapper')}>
      <span className={cx('title-container')}>
        <span className={cx('title')}>리뷰 남긴 상품</span>
        <span className={cx('title')}>등록한 상품</span>
        <span className={cx('title')}>찜한 상품</span>
      </span>
      <div className={cx('product-card-container')}>
        {/* 임시 카드 */}
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
        <ProductCard productItem={productItem} />
      </div>
    </section>
  );
}
