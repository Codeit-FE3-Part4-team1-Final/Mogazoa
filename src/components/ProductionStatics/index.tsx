import Statistics from '@/components/StatisticsCard';
import cx from '@/components/ProductionStatics/cx.ts';
import { ProductDetailType } from '@/types/types.ts';

const CARD_TYPE: string[] = ['STAR', 'SAVE', 'REVIEW'];

export default function ProductionStatics({
  productData,
}: Readonly<{
  productData: ProductDetailType;
}>) {
  return (
    <div className={cx('card-container')}>
      {CARD_TYPE.map((type) => (
        <Statistics key={type} type={type} product={productData} />
      ))}
    </div>
  );
}
