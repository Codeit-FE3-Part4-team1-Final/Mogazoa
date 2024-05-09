'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { UserDetail } from '@/types/types';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import ProfileFollowModal from '@/components/Modal/ProfileFollowModal';
import useUserFollowData from '@/hooks/useUserFollowData';
import logout from '@/utils/logout';
import handleErrorImage from '@/utils/handleErrorImage';
import EditProfile from '@/components/Modal/EditProfile';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
  userId: string;
  isLoggedIn: boolean;
  token: string;
}

export default function ProfileCard({
  userDetail,
  userId,
  isLoggedIn,
  token,
}: Props) {
  const {
    pathname,
    followMutation,
    unfollowMutation,
    isOpened,
    followData,
    modalType,
    handleToggleModal,
    handleClickFollow,
    handleClickUnFollow,
    fetchNextFollowee,
    fetchNextFollower,
  } = useUserFollowData(userId, token, isLoggedIn);

  const profileModalType =
    modalType === 'editProfile' ||
    modalType === 'followers' ||
    modalType === 'followees';

  return (
    <div className={cx('wrapper')}>
      <Image
        src={userDetail.image || `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}`}
        alt='profile-image'
        width={180}
        height={180}
        className={cx('blur-image')}
        onError={(e) => handleErrorImage(e)}
      />
      {isOpened && profileModalType ? (
        <ModalWrapper>
          {modalType === 'editProfile' ? (
            <EditProfile userDetail={userDetail} token={token} />
          ) : (
            <ProfileFollowModal
              data={followData}
              modalType={modalType}
              userName={userDetail.nickname}
              fetchNextFollowee={fetchNextFollowee}
              fetchNextFollower={fetchNextFollower}
            />
          )}
        </ModalWrapper>
      ) : null}
      <div className={cx('container')}>
        <div className={cx('profile-image-box')}>
          <Image
            src={
              userDetail.image || `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}`
            }
            alt='profile-image'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: 'cover' }}
            onError={(e) => handleErrorImage(e)}
          />
        </div>
        <div className={cx('user-information')}>
          <span className={cx('user-name')}>{userDetail.nickname}</span>
          <p className={cx('user-description')}>{userDetail.description}</p>
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
        <div className={cx('button-box')}>
          {pathname === '/mypage' ? (
            <>
              <Button
                category='primary'
                onClick={() => handleToggleModal('editProfile')}
              >
                프로필 편집
              </Button>
              <Button category='tertiary' onClick={() => logout()}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              category={userDetail.isFollowing ? 'tertiary' : 'primary'}
              onClick={
                userDetail.isFollowing
                  ? (e) => handleClickUnFollow(e)
                  : (e) => handleClickFollow(e)
              }
              disabled={followMutation.isPending || unfollowMutation.isPending}
            >
              {userDetail.isFollowing ? '팔로우 취소' : '팔로우'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
