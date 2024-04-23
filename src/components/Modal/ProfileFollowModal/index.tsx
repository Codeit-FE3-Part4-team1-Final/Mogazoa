import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProfileFollowModal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  modalType: string;
}

export default function ProfileFollowModal({ modalType }: Props) {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('category')}>
        팀쿡님{modalType === 'follower' ? '을' : '이'} 팔로우하는 유저
      </span>
      <div className={cx('user-list')}>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>
            갈릭버터브레드갈릭버터브레드갈릭버터브레
          </span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
        <div className={cx('user-information')}>
          <Image
            src={'/images/profile-image.png'}
            alt='user-image'
            width={52}
            height={52}
            className={cx('user-image')}
          />
          <span className={cx('user-name')}>갈릭버터브레드</span>
        </div>
      </div>
    </div>
  );
}
