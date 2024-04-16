import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import { Nickname, UrlType } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  image: UrlType | null;
  nickname: Nickname;
  description: string;
  followeesCount: number;
  followersCount: number;
}

export default function ProfileCard({
  image,
  nickname,
  description,
  followeesCount,
  followersCount,
}: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Image
          src={image || '/images/profile-image.png'}
          alt='profile-image'
          width={180}
          height={180}
          className={cx('profile-image')}
        />
        <div className={cx('user-information')}>
          <span className={cx('user-name')}>{nickname}</span>
          <p className={cx('user-explain')}>{description}</p>
        </div>
        <div className={cx('user-follow-box')}>
          <div className={cx('follow')}>
            <span className={cx('count')}>{followersCount}</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div className={cx('follow')}>
            <span className={cx('count')}>{followeesCount}</span>
            <span className={cx('text')}>팔로잉</span>
          </div>
        </div>
        <Button category='primary'>팔로우</Button>
      </div>
    </div>
  );
}
