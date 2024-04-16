import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

export default function ProfileCard() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Image
          src={'/images/profile-image.png'}
          alt='profile-image'
          width={180}
          height={180}
          className={cx('profile-image')}
        />
        <div className={cx('user-information')}>
          <span className={cx('user-name')}>surisuri마수리</span>
          <p className={cx('user-explain')}>
            세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도
            프로쇼핑러! 안녕하세요, 별점의 화신 surisuri마수리입니다!
          </p>
        </div>
        <div className={cx('user-follow')}>
          <div className={cx('follow')}>
            <span className={cx('count')}>762</span>
            <span className={cx('text')}>팔로워</span>
          </div>
          <hr className={cx('separator')} />
          <div className={cx('follow')}>
            <span className={cx('count')}>102</span>
            <span className={cx('text')}>팔로잉</span>
          </div>
        </div>
        <Button category='primary'>팔로우</Button>
      </div>
    </div>
  );
}
