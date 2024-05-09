import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ActivityCard.module.scss';
import CategoryChip from '@/components/Chip/CategoryChip';
import { ProductCategory } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  category: 'star' | 'review' | 'interest';
  productCategory?: ProductCategory;
  rating?: number;
}

export default function ActivityCard({
  category,
  productCategory,
  rating,
}: Props) {
  const activity = {
    star: {
      text: '남긴 별점 평균',
      src: '/images/star-icon.svg',
    },
    review: {
      text: '남긴 리뷰',
      src: '/images/review-icon.svg',
    },
    interest: {
      text: '관심 카테고리',
      src: '',
    },
  };
  const { text, src } = activity[category];
  return (
    <div className={cx('activity-card')}>
      <div className={cx('container')}>
        <span className={cx('category')}>{text}</span>
        <div className={cx('information')}>
          {category === 'interest' ? (
            <CategoryChip
              productCategory={productCategory || '없음'}
              size='large'
            />
          ) : (
            <>
              <Image
                src={src}
                alt='star-icon'
                width={24}
                height={24}
                className={cx('icon')}
              />
              <span className={cx('count')}>{rating}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
