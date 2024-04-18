import classNames from 'classnames/bind';
import { Suspense } from 'react';
import ProfileProductPanel from '@/components/ProfileProductPanel';
import ActivityDetail from '@/components/ActivityDetail';
import ProfileCard from '@/components/Card/ProfileCard';
import styles from './ProfileSection.module.scss';

const cx = classNames.bind(styles);

export default function ProfileSection() {
  return (
    <main className={cx('wrapper')}>
      <section className={cx('container')}>
        <div className={cx('profile-section')}>
          <Suspense fallback={<div>로딩중</div>}>
            <ProfileCard />
          </Suspense>
        </div>
        <section className={cx('activity-section')}>
          <Suspense fallback={<div>로딩중</div>}>
            <ActivityDetail />
          </Suspense>
          <ProfileProductPanel />
        </section>
      </section>
    </main>
  );
}
