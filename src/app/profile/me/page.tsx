import classNames from 'classnames/bind';
import ActivityDetail from '@/components/ActivityDetail';
import ProfileCard from '@/components/Card/ProfileCard';
import ProfileProductPanel from '@/components/ProfileProductPanel';
import { UserDetail } from '@/types/types';
import styles from './page.module.scss';

// 임시 데이터
const userDetail: UserDetail = {
  id: 1,
  nickname: '코드잇',
  description: '안녕하세요. 제가 첫번째 유저인가요? 하하하 ',
  image: null,
  createdAt: '2024-01-29T09:08:53.561Z',
  updatedAt: '2024-01-29T09:08:53.561Z',
  teamId: 'default',
  isFollowing: false,
  followersCount: 873,
  followeesCount: 143,
  reviewCount: 139,
  averageRating: 3.8,
  mostFavoriteCategory: {
    name: '영화/드라마',
    id: 2,
  },
};

const cx = classNames.bind(styles);

export default function page() {
  return (
    <main className={cx('wrapper')}>
      <div className={cx('profile-section')}>
        <ProfileCard userDetail={userDetail} />
      </div>
      <section className={cx('activity-section')}>
        <ActivityDetail userDetail={userDetail} />
        <ProfileProductPanel />
      </section>
    </main>
  );
}
