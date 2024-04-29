import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

interface Props {
  userImage: string | null;
}

export default function ImageInput({ userImage }: Props) {
  return (
    <>
      <label className={cx('input-label')} htmlFor='profile-image'>
        {!userImage ? (
          <Image
            src={'/images/add-photo-icon.svg'}
            alt='add-photo-icon'
            width={34}
            height={34}
            className={cx('add-photo-icon')}
          />
        ) : null}
      </label>
      <input type='file' className={cx('input')} id='profile-image' />
    </>
  );
}
