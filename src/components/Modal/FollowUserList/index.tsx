import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './FollowUserList.module.scss';
import { ModalType, User } from '@/types/types';
import handleErrorImage from '@/utils/handleErrorImage';
import { useModalStore } from '../../../../providers/ModalStoreProvider';

const cx = classNames.bind(styles);

interface Props {
  user: User;
  modalType: ModalType;
}

export default function FollowUserList({ user }: Props) {
  const { toggleModal } = useModalStore((state) => state);
  return (
    <Link href={`/user/${user.id}`} onClick={toggleModal}>
      <div className={cx('user-information')}>
        <div className={cx('profile-image-box')}>
          <Image
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={user.image || '/images/profile-image.png'}
            alt='user-image'
            style={{ objectFit: 'cover' }}
            onError={(e) => handleErrorImage(e)}
          />
        </div>
        <span className={cx('user-name')}>{user.nickname}</span>
      </div>
    </Link>
  );
}
