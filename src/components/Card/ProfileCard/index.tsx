'use client';

import { useLayoutEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { UserDetail, UserFolloweeList, UserFollowerList } from '@/types/types';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { useModalStore } from '../../../../providers/ModalStoreProvider';
import ProfileFollowModal from '@/components/Modal/ProfileFollowModal';
import {
  getUserFolloweeList,
  getUserFollowerList,
} from '@/utils/getUserFollowList';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
  userId: string;
}

export type ModalType = 'followers' | 'followees';

export default function ProfileCard({ userDetail, userId }: Props) {
  // TODO: 팔로워 or 팔로잉 목록 data react-query
  const { isOpened, toggleModal } = useModalStore((state) => state);
  const [modalType, setModalType] = useState<ModalType>('followers');
  const [followData, setFollowData] = useState<
    UserFollowerList | UserFolloweeList
  >();

  const { data: follower } = useQuery<UserFollowerList | UserFolloweeList>({
    queryKey: ['user-follower-list', userId],
    queryFn: () => getUserFollowerList(userId),
    staleTime: 60 * 5 * 1000,
  });
  const { data: followee } = useQuery<UserFollowerList | UserFolloweeList>({
    queryKey: ['user-followee-list', userId],
    queryFn: () => getUserFolloweeList(userId),
    staleTime: 60 * 5 * 1000,
  });

  const handleToggleModal = async (type: ModalType) => {
    setModalType(type);

    toggleModal();
  };

  useLayoutEffect(() => {
    if (modalType === 'followers') {
      setFollowData(follower);
    }
    if (modalType === 'followees') {
      setFollowData(followee);
    }
  }, [modalType, follower, followee]);

  return (
    <div className={cx('wrapper')}>
      {isOpened ? (
        <ModalWrapper>
          <ProfileFollowModal
            data={followData}
            modalType={modalType}
            userName={userDetail.nickname}
          />
        </ModalWrapper>
      ) : null}
      <div className={cx('container')}>
        <Image
          src={userDetail.image || '/images/profile-image.png'}
          alt='profile-image'
          width={180}
          height={180}
          className={cx('profile-image')}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/profile-image.png';
          }}
        />
        <div className={cx('user-information')}>
          <span className={cx('user-name')}>{userDetail.nickname}</span>
          <p className={cx('user-explain')}>{userDetail.description}</p>
        </div>
        <div className={cx('user-follow-box')}>
          <div
            className={cx('follow')}
            onClick={() => handleToggleModal('followers')}
          >
            <span className={cx('count')}>{userDetail.followersCount}</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div
            className={cx('follow')}
            onClick={() => handleToggleModal('followees')}
          >
            <span className={cx('count')}>{userDetail.followeesCount}</span>
            <span className={cx('text')}>팔로잉</span>
          </div>
        </div>
        <Button category='primary'>팔로우</Button>
      </div>
    </div>
  );
}
