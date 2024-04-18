import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';
import getUserDetail from '@/utils/getUserDetail';

const cx = classNames.bind(styles);

export default async function ProfileCard() {
  const userDetail = await getUserDetail(1);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Image
          src={userDetail.image || '/images/profile-image.png'}
          alt='profile-image'
          width={180}
          height={180}
          className={cx('profile-image')}
        />
        <div className={cx('user-information')}>
          <span className={cx('user-name')}>{userDetail.nickname}</span>
          <p className={cx('user-explain')}>{userDetail.description}</p>
        </div>
        <div className={cx('user-follow-box')}>
          <div className={cx('follow')}>
            <span className={cx('count')}>{userDetail.followersCount}</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div className={cx('follow')}>
            <span className={cx('count')}>{userDetail.followeesCount}</span>
            <span className={cx('text')}>팔로잉</span>
          </div>
        </div>
        <Button category='primary'>팔로우</Button>
      </div>
    </div>
  );
}
