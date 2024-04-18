import classNames from 'classnames/bind';
import styles from './ActivityDetail.module.scss';
import ActivityCard from '../Card/ActivityCard';
import { UserDetail } from '@/types/types';
import getUserDetail from '@/utils/getUserDetail';

const cx = classNames.bind(styles);

export default async function ActivityDetail() {
  const userDetail: UserDetail = await getUserDetail(1);
  return (
    <section className={cx('wrapper')}>
      <span className={cx('title')}>활동 내역</span>
      <div className={cx('card-box')}>
        <ActivityCard category='star' rating={userDetail.averageRating} />
        <ActivityCard category='review' rating={userDetail.reviewCount} />
        <ActivityCard
          category='interest'
          productCategory={userDetail.mostFavoriteCategory?.name}
        />
      </div>
    </section>
  );
}
