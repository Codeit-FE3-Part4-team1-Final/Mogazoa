/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TableCompare.module.scss';

const cx = classNames.bind(styles);

interface TableCompareInterface {
  SubjectProduct: any;
  ObjectProduct: any;
  handleCount: (value: number) => void;
  showVictoryProduct: (value: string) => void;
}

export default function TableCompare({
  SubjectProduct,
  ObjectProduct,
  handleCount,
  showVictoryProduct,
}: TableCompareInterface) {
  const SubjectProductFavorite = SubjectProduct?.favoriteCount;
  const SubjectProductReview = SubjectProduct?.reviewCount;
  const SubjectProductRating = SubjectProduct?.rating?.toFixed(1);
  const ObjectProductFavorite = ObjectProduct?.favoriteCount;
  const ObjectProductReview = ObjectProduct?.reviewCount;
  const ObjectProductRating = ObjectProduct?.rating?.toFixed(1);

  const compareCount = (subject: number, object: number) => {
    return subject === object ? 0 : subject > object ? 1 : -1;
  };

  const favorite = compareCount(
    SubjectProductFavorite ?? 0,
    ObjectProductFavorite ?? 0,
  );
  const review = compareCount(
    SubjectProductReview ?? 0,
    ObjectProductReview ?? 0,
  );
  const rating = compareCount(
    SubjectProductRating ?? 0,
    ObjectProductRating ?? 0,
  );

  const count = ['favoriteCount', 'reviewCount', 'rating'].map<number>(
    (key) => {
      const SubjectCount = Math.floor(SubjectProduct[key] * 10) / 10;
      const ObjectCount = Math.floor(ObjectProduct[key] * 10) / 10;

      if (SubjectCount > ObjectCount) {
        return 1;
      }
      if (SubjectCount < ObjectCount) {
        return -1;
      }
      return 0;
    },
  );

  const total = count.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );
  const findVictoryProduct = count.filter((number) => {
    if (total > 0) return number === 1;
    if (total < 0) return number === -1;
  }).length;

  const victoryProduct = total > 0 ? SubjectProduct.name : ObjectProduct.name;

  useEffect(() => {
    handleCount(findVictoryProduct);
    showVictoryProduct(!total ? '무승부' : victoryProduct);
  }, []);

  return (
    <tbody>
      <tr>
        <td>찜 개수</td>
        <td className={cx('product-count')}>{SubjectProductFavorite}</td>
        <td className={cx('product-count')}>{ObjectProductFavorite}</td>
        {favorite === 1 ? (
          <td className={cx('subejct-victory')}>상품 1 승리</td>
        ) : favorite === -1 ? (
          <td className={cx('object-victory')}>상품 2 승리</td>
        ) : (
          <td className={cx('product-count')}>무승부</td>
        )}
      </tr>
      <tr>
        <td>리뷰 개수</td>
        <td className={cx('product-count')}>{SubjectProductReview}</td>
        <td className={cx('product-count')}>{ObjectProductReview}</td>
        {review === 1 ? (
          <td className={cx('subejct-victory')}>상품 1 승리</td>
        ) : review === -1 ? (
          <td className={cx('object-victory')}>상품 2 승리</td>
        ) : (
          <td className={cx('product-count')}>무승부</td>
        )}
      </tr>
      <tr>
        <td>찜 개수</td>
        <td className={cx('product-count')}>{SubjectProductRating}</td>
        <td className={cx('product-count')}>{ObjectProductRating}</td>
        {rating === 1 ? (
          <td className={cx('subejct-victory')}>상품 1 승리</td>
        ) : rating === -1 ? (
          <td className={cx('object-victory')}>상품 2 승리</td>
        ) : (
          <td className={cx('product-count')}>무승부</td>
        )}
      </tr>
    </tbody>
  );
}
