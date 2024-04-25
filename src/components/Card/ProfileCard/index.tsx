'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { UserDetail } from '@/types/types';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import ProfileFollowModal from '@/components/Modal/ProfileFollowModal';
import useUserFollowData from '@/hooks/useUserFollowData';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
  userId: string;
}

export type ModalType = 'followers' | 'followees';

export default function ProfileCard({ userDetail, userId }: Props) {
  const pathname = usePathname();
  const { isOpened, followData, modalType, handleToggleModal } =
    useUserFollowData(userId);

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
        <div className={cx('button-box')}>
          {pathname === '/mypage' ? (
            <>
              <Button category='primary'>프로필 편집</Button>
              <Button category='tertiary'>로그아웃</Button>
            </>
          ) : (
            <Button category='primary'>팔로우</Button>
          )}
        </div>
      </div>
    </div>
  );
}
