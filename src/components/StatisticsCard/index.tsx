import Image from 'next/image';
import TYPE_DATA from '@/components/StatisticsCard/constants.ts';
import { ProductDetailType } from '@/types/types.ts';
import cx from './cx.ts';
import generateComparisonText from '@/components/StatisticsCard/utils/ComparisonText.tsx';

interface Props {
  type: string;
  product: ProductDetailType;
}

export default function Statistics({ type, product }: Readonly<Props>) {
  const { unit, icon, label, metricKey } = TYPE_DATA[type] || {};
  if (!unit || !icon || !label || !metricKey) return null;

  const count = product[metricKey];
  const averageCount = product.categoryMetric[metricKey];
  const comparisonText = generateComparisonText(count, averageCount, unit);

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
