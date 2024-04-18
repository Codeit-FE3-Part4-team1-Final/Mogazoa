import classNames from 'classnames/bind';
import ActivityDetail from '@/components/ActivityDetail';
import ProfileCard from '@/components/Card/ProfileCard';
import ProfileProductPanel from '@/components/ProfileProductPanel';
import styles from './ProfileSection.module.scss';

const cx = classNames.bind(styles);

export default function ProfileSection() {
  return (
    <main className={cx('wrapper')}>
      <section className={cx('container')}>
        <div className={cx('profile-section')}>
          <ProfileCard />
        </div>
        <section className={cx('activity-section')}>
          <ActivityDetail />
          <ProfileProductPanel />
        </section>
      </section>
    </main>
  );
}
