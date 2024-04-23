import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProfileFollowModal.module.scss';
import { Nickname, UserFolloweeList, UserFollowerList } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  modalType: string;
  userName: Nickname;
}

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

export default function ProfileFollowModal({ modalType, userName }: Props) {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('category')}>
        {userName}님{modalType === 'follower' ? '을' : '이'} 팔로우하는 유저
      </span>
      {modalType === 'follower'
        ? follower.list.map((user) => {
            return (
              <div className={cx('user-list')}>
                <div className={cx('user-information')}>
                  <Image
                    src={user.follower.image || '/images/profile-image.png'}
                    alt='user-image'
                    width={52}
                    height={52}
                    className={cx('user-image')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/profile-image.png';
                    }}
                  />
                  <span className={cx('user-name')}>
                    {user.follower.nickname}
                  </span>
                </div>
              </div>
            );
          })
        : followee.list.map((user) => {
            return (
              <div className={cx('user-list')}>
                <div className={cx('user-information')}>
                  <Image
                    src={user.followee.image || '/images/profile-image.png'}
                    alt='user-image'
                    width={52}
                    height={52}
                    className={cx('user-image')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/profile-image.png';
                    }}
                  />
                  <span className={cx('user-name')}>
                    {user.followee.nickname}
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
}
