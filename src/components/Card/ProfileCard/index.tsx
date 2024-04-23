'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { UserDetail, UserFolloweeList, UserFollowerList } from '@/types/types';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { useModalStore } from '../../../../providers/ModalStoreProvider';
import ProfileFollowModal from '@/components/Modal/ProfileFollowModal';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
}

export type ModalType = 'follower' | 'followee';

// 임시 팔로우, 팔로잉 목록
const follower: UserFollowerList = {
  list: [
    {
      id: 99,
      follower: {
        id: 17,
        nickname: '눈토끼',
        description: '데이터 변경',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/17/1710468437102/img',
        createdAt: '2024-03-05T04:29:38.880Z',
        updatedAt: '2024-04-02T02:49:48.734Z',
        teamId: '2-4',
      },
    },
    {
      id: 69,
      follower: {
        id: 40,
        nickname: '호두는쓰다',
        description: '',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/40/1710723776808/img',
        createdAt: '2024-03-09T06:21:30.842Z',
        updatedAt: '2024-03-18T01:02:57.852Z',
        teamId: '2-4',
      },
    },
    {
      id: 65,
      follower: {
        id: 38,
        nickname: '폭탄뉴진세',
        description: '폭탄이다! 도망쳐라! ',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/38/1712103051367/zNf4UgmHC7',
        createdAt: '2024-03-07T01:49:39.396Z',
        updatedAt: '2024-04-03T00:10:55.267Z',
        teamId: '2-4',
      },
    },
    {
      id: 57,
      follower: {
        id: 16,
        nickname: '보미왕',
        description: '',
        image: 'http://localhost:3000/icons/default_profile.svg',
        createdAt: '2024-03-04T08:07:18.961Z',
        updatedAt: '2024-03-18T00:48:01.269Z',
        teamId: '2-4',
      },
    },
  ],
  nextCursor: null,
};

const followee: UserFolloweeList = {
  list: [
    {
      id: 74,
      followee: {
        id: 40,
        nickname: '호두는쓰다',
        description: '',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/40/1710723776808/img',
        createdAt: '2024-03-09T06:21:30.842Z',
        updatedAt: '2024-03-18T01:02:57.852Z',
        teamId: '2-4',
      },
    },
    {
      id: 73,
      followee: {
        id: 38,
        nickname: '폭탄뉴진세',
        description: '폭탄이다! 도망쳐라! ',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/38/1712103051367/zNf4UgmHC7',
        createdAt: '2024-03-07T01:49:39.396Z',
        updatedAt: '2024-04-03T00:10:55.267Z',
        teamId: '2-4',
      },
    },
    {
      id: 72,
      followee: {
        id: 12,
        nickname: '벤자민3세',
        description: '앞으로 활발하게 활동해보겠습니다!',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/12/1712018490427/AKQF1h0r33',
        createdAt: '2024-02-29T23:02:41.612Z',
        updatedAt: '2024-04-02T00:41:33.579Z',
        teamId: '2-4',
      },
    },
    {
      id: 49,
      followee: {
        id: 53,
        nickname: '초코파이',
        description: '',
        image: null,
        createdAt: '2024-03-15T03:26:17.006Z',
        updatedAt: '2024-03-15T03:26:17.006Z',
        teamId: '2-4',
      },
    },
  ],
  nextCursor: null,
};

export default function ProfileCard({ userDetail }: Props) {
  // TODO: 팔로워 or 팔로잉 목록 data react-query
  const { isOpened, toggleModal } = useModalStore((state) => state);
  const [modalType, setModalType] = useState<ModalType>('follower');
  const [followData, setFollowData] = useState<
    UserFollowerList | UserFolloweeList
  >();

  const handleToggleModal = (type: ModalType) => {
    setModalType(type);

    if (type === 'follower') {
      setFollowData(follower);
    }
    if (type === 'followee') {
      setFollowData(followee);
    }

    toggleModal();
  };

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
            onClick={() => handleToggleModal('follower')}
          >
            <span className={cx('count')}>{userDetail.followersCount}</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div
            className={cx('follow')}
            onClick={() => handleToggleModal('followee')}
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
