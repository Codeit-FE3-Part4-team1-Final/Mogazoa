import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './FollowUserList.module.scss';
import { User } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  user: User;
  modalType: 'follower' | 'followee';
}

export default function FollowUserList({ user }: Props) {
  return (
    <div className={cx('user-list')}>
      <div className={cx('user-information')}>
        <Image
          src={user.image || '/images/profile-image.png'}
          alt='user-image'
          width={52}
          height={52}
          className={cx('user-image')}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/profile-image.png';
          }}
        />
        <span className={cx('user-name')}>{user.nickname}</span>
      </div>
    </div>
  );
}
