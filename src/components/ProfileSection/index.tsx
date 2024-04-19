import classNames from 'classnames/bind';
import ProfileProductPanel from '@/components/ProfileProductPanel';
import ActivityDetail from '@/components/ActivityDetail';
import ProfileCard from '@/components/Card/ProfileCard';
import styles from './ProfileSection.module.scss';
import getUserDetail from '@/utils/getUserDetail';
import { UserDetail } from '@/types/types';
import ModalWrapper from '../Modal/ModalWrapper';

const cx = classNames.bind(styles);

interface Props {
  userId: string;
}

export default async function ProfileSection({ userId }: Props) {
  const userDetail: UserDetail = await getUserDetail(userId);
  return (
    <main className={cx('wrapper')}>
      <ModalWrapper>모달 모달 모달 모달 모달 모달 </ModalWrapper>
      <section className={cx('container')}>
        <div className={cx('profile-section')}>
          <ProfileCard userDetail={userDetail} />
        </div>
        <section className={cx('activity-section')}>
          <ActivityDetail userDetail={userDetail} />
          <ProfileProductPanel />
        </section>
      </section>
    </main>
  );
}
