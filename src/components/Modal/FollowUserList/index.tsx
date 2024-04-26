import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './FollowUserList.module.scss';
import { User } from '@/types/types';
import { ModalType } from '@/components/Card/ProfileCard';
import handleErrorImage from '@/utils/handleErrorImage';

const cx = classNames.bind(styles);

interface Props {
  user: User;
  modalType: ModalType;
}

export default function FollowUserList({ user }: Props) {
  return (
    <div className={cx('user-information')}>
      <Image
        src={user.image || '/images/profile-image.png'}
        alt='user-image'
        width={52}
        height={52}
        className={cx('user-image')}
        onError={(e) => handleErrorImage(e)}
      />
      <span className={cx('user-name')}>{user.nickname}</span>
    </div>
  );
}
