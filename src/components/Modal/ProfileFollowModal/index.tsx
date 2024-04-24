import classNames from 'classnames/bind';
import styles from './ProfileFollowModal.module.scss';
import {
  FollowerList,
  FolloweeList,
  Nickname,
  UserFolloweeList,
  UserFollowerList,
} from '@/types/types';
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
        {userName}님{modalType === 'followers' ? '을' : '이'} 팔로우하는 유저
      </span>
      <div className={cx('user-list')}>
        {data?.list.map((user: FollowerList | FolloweeList) => {
          if ('follower' in user) {
            return (
              <FollowUserList
                user={user.follower}
                modalType={modalType}
                key={user.id}
              />
            );
          }
          if ('followee' in user) {
            return (
              <FollowUserList
                user={user.followee}
                modalType={modalType}
                key={user.id}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
