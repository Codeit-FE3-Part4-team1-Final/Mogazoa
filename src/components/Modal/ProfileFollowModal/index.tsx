import classNames from 'classnames/bind';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';
import styles from './ProfileFollowModal.module.scss';
import {
  Nickname,
  UserFolloweeList,
  UserFollowerList,
  ModalType,
} from '@/types/types';
import FollowUserList from '../FollowUserList';
import useInfiniteFollow from '@/hooks/useInfiniteFollow';

const cx = classNames.bind(styles);

interface Props {
  modalType: ModalType;
  userName: Nickname;
  data: UserFollowerList[] | UserFolloweeList[] | undefined;
  fetchNextFollowee: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UserFolloweeList, unknown>, Error>
  >;
  fetchNextFollower: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UserFollowerList, unknown>, Error>
  >;
}

export default function ProfileFollowModal({
  modalType,
  userName,
  data,
  fetchNextFollowee,
  fetchNextFollower,
}: Props) {
  const userListRef = useInfiniteFollow(
    modalType,
    fetchNextFollowee,
    fetchNextFollower,
  );

  return (
    <div className={cx('wrapper')}>
      <span className={cx('category')}>
        {userName}님{modalType === 'followers' ? '을' : '이'} 팔로우하는 유저
      </span>
      <div className={cx('user-list')} ref={userListRef}>
        {data?.map((users) =>
          users.list.map((user) => {
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
          }),
        )}
      </div>
    </div>
  );
}
