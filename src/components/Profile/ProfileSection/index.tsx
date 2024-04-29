import classNames from 'classnames/bind';
import ProfileProductPanel from '@/components/Profile/ProfileProductPanel';
import ActivityDetail from '@/components/ActivityDetail';
import ProfileCard from '@/components/Card/ProfileCard';
import styles from './ProfileSection.module.scss';
import { UserDetail } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  userId: string;
  userDetail: UserDetail;
  isLoggedIn: boolean;
  token: string;
}

export default function ProfileSection({
  userId,
  userDetail,
  isLoggedIn,
  token,
}: Props) {
  return (
    <main className={cx('wrapper')}>
      <section className={cx('container')}>
        <div className={cx('profile-section')}>
          <ProfileCard
            userDetail={userDetail}
            userId={userId}
            isLoggedIn={isLoggedIn}
            token={token}
          />
        </div>
        <section className={cx('activity-section')}>
          <ActivityDetail userDetail={userDetail} />
          <ProfileProductPanel userId={userId} />
        </section>
      </section>
    </main>
  );
}
