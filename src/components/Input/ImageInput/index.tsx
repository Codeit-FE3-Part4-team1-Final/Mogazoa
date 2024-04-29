import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

export default function ImageInput() {
  return (
    <>
      <label className={cx('input-label')} htmlFor='profile-image'>
        <Image
          src={'/images/add-photo-icon.svg'}
          alt='add-photo-icon'
          width={34}
          height={34}
          className={cx('add-photo-icon')}
        />
      </label>
      <input type='file' className={cx('input')} id='profile-image' />
    </>
  );
}
