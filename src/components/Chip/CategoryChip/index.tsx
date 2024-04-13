import classNames from 'classnames/bind';
import styles from './CategoryChip.module.scss';
import { ProductCategory } from '@/types/types';
import convertCategoryToEnglish from '@/utils/convertCategoryToEnglish';

const cx = classNames.bind(styles);

interface Props {
  productCategory: ProductCategory;
  size?: 'large' | 'small';
}

export default function CategoryChip({
  productCategory,
  size = 'small',
}: Props) {
  const convertedCategory = convertCategoryToEnglish(productCategory);
  return (
    <div className={cx('chip', styles[convertedCategory], styles[size])}>
      {productCategory}
    </div>
  );
}
