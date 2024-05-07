import classNames from 'classnames/bind';
import styles from './NoFollow.module.scss';
import { ModalType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  modalType: ModalType;
}

export default function NoFollow({ modalType }: Props) {
  const getText = () => {
    if (modalType === 'followers') {
      return '팔로워가 없습니다.';
    }
    if (modalType === 'followees') {
      return '관심있는 유저를 팔로우 해보세요.';
    }
    return '';
  };

  return <div className={cx('wrapper')}>{getText()}</div>;
}
