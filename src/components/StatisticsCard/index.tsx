import Image from 'next/image';
import TYPE_DATA from '@/components/StatisticsCard/constants.ts';
import { ProductDetailType } from '@/types/types.ts';
import cx from './cx.ts';

interface Props {
  type: string;
  product: ProductDetailType;
}

export default function Statistics({ type, product }: Readonly<Props>) {
  const { unit, icon, label, metricKey } = TYPE_DATA[type] || {};

  const count: number = product[metricKey];
  const averageCount = product.categoryMetric[metricKey];

  let comparisonText;
  if (count === averageCount) {
    comparisonText = '이 카테고리 내의 평균과 동일해요!';
  } else {
    const difference = count - averageCount;
    const formattedDifference =
      metricKey === 'rating'
        ? difference.toFixed(1)
        : Math.abs(difference).toLocaleString();

    if (count > averageCount) {
      comparisonText = (
        <>
          같은 카테고리의 제품들보다{' '}
          <span className='difference'>
            {formattedDifference} {unit}
          </span>{' '}
          더 높아요!
        </>
      );
    } else {
      comparisonText = (
        <>
          같은 카테고리의 제품들보다{' '}
          <span className='difference'>
            {formattedDifference} {unit}
          </span>{' '}
          낮아요.
        </>
      );
    }
  }

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('label')}>{label}</div>
        <div className={cx('point')}>
          <Image src={icon} alt='' width={24} height={24} />
          {count}
        </div>
      </div>
      <div className={cx('text')}>{comparisonText}</div>
    </div>
  );
}
