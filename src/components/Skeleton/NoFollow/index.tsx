import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './NoFollow.module.scss';
import { ModalType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  modalType: ModalType;
}

export default function NoFollow({ modalType }: Props) {
  const pathname = usePathname();
  const getMyPageText = () => {
    if (modalType === 'followers') {
      return '팔로워가 없습니다.';
    }
    if (modalType === 'followees') {
      return '관심있는 유저를 팔로우 해보세요.';
    }
    return '';
  };
  const getUserPageText = () => {
    if (modalType === 'followers') {
      return '팔로워가 없습니다.';
    }
    if (modalType === 'followees') {
      return '팔로우한 유저가 없습니다.';
    }
    return '';
  };

  return (
    <div className={cx('wrapper')}>
      {pathname === '/mypage' ? getMyPageText() : getUserPageText()}
    </div>
  );
}
