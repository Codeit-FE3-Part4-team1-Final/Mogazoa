import classNames from 'classnames/bind';
import styles from './ProfileFollowModal.module.scss';
import { Nickname, UserFolloweeList, UserFollowerList } from '@/types/types';
import FollowUserList from '../FollowUserList';
import { ModalType } from '@/components/Card/ProfileCard';

const cx = classNames.bind(styles);

interface Props {
  modalType: ModalType;
  userName: Nickname;
  data: UserFollowerList | UserFolloweeList | undefined;
}

export default function ProfileFollowModal({
  modalType,
  userName,
  data,
}: Props) {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('category')}>
        {userName}님{modalType === 'follower' ? '을' : '이'} 팔로우하는 유저
      </span>
      {data?.list.map((user) => {
        return (
          <FollowUserList
            user={user[modalType]}
            modalType={modalType}
            key={user.id}
          />
        );
      })}
    </div>
  );
}
