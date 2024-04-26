import classNames from 'classnames/bind';
import styles from './Result.module.scss';

const cx = classNames.bind(styles);

interface ResultInterface {
  count: number;
  victoryProduct: string;
}

export default function Result({ count, victoryProduct }: ResultInterface) {
  return count === 0 ? (
    <div className={cx('title')}>무승부입니다!</div>
  ) : (
    <div className={cx('title')}>
      <span data-splitting='chars' className={cx('product')}>
        {victoryProduct}
      </span>{' '}
      상품이 승리하였습니다!
    </div>
  );
}
