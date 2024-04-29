import Image from 'next/image';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  userImage: string | null;
  register?: UseFormRegisterReturn;
  resetFile?: () => void;
}

export default function ImageInput({ userImage, register, resetFile }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Image
        src={'/images/close-icon.svg'}
        alt='close-icon'
        width={30}
        height={30}
        className={cx('close-icon')}
        onClick={resetFile}
      />
      <label className={cx('input-label')} htmlFor='profile-image'>
        {userImage ? (
          <Image
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={userImage}
            alt='product-image'
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Image
            src={'/images/add-photo-icon.svg'}
            alt='add-photo-icon'
            width={34}
            height={34}
            className={cx('add-photo-icon')}
          />
        )}
      </label>
      <input
        type='file'
        accept='image/*'
        className={cx('input')}
        id='profile-image'
        {...register}
      />
    </div>
  );
}
