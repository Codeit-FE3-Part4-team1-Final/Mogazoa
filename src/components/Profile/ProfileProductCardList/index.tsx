import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './ProfileProductCardList.module.scss';
import ProductCard from '@/components/Card/ProductCard';
import { ProductListType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  productCardItem: ProductListType[] | undefined;
}

export default function ProfileProductCardList({ productCardItem }: Props) {
  return (
    <div className={cx('product-card-container')}>
      {productCardItem?.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            className={cx('product-link')}
            key={product.id}
          >
            <ProductCard productItem={product} />
          </Link>
        );
      })}
    </div>
  );
}
