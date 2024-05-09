import classNames from 'classnames/bind';
import styles from './ActivityDetail.module.scss';
import ActivityCard from '../Card/ActivityCard';
import { UserDetail } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
}

export default function ActivityDetail({ userDetail }: Props) {
  return (
    <section className={cx('wrapper')}>
      <span className={cx('title')}>활동 내역</span>
      <div className={cx('card-box')}>
        <ActivityCard
          category='star'
          rating={
            userDetail.averageRating
              ? Number(userDetail.averageRating.toFixed(1))
              : 0
          }
        />
        <ActivityCard category='review' rating={userDetail.reviewCount} />
        <ActivityCard
          category='interest'
          productCategory={userDetail.mostFavoriteCategory?.name}
        />
      </div>
    </section>
  );
}
