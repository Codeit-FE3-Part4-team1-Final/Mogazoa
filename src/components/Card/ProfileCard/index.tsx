'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { UserDetail } from '@/types/types';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { useModalStore } from '../../../../providers/ModalStoreProvider';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
}

export default function ProfileCard({ userDetail }: Props) {
  const { opened, toggleModal } = useModalStore((state) => state);
  return (
    <div className={cx('wrapper')}>
      {opened ? (
        <ModalWrapper>모달 모달 모달 모달 모달 모달 </ModalWrapper>
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
          <div className={cx('follow')} onClick={toggleModal}>
            <span className={cx('count')}>{userDetail.followersCount}</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div className={cx('follow')} onClick={toggleModal}>
            <span className={cx('count')}>{userDetail.followeesCount}</span>
            <span className={cx('text')}>팔로잉</span>
          </div>
        </div>
        <Button category='primary'>팔로우</Button>
      </div>
    </div>
  );
}
