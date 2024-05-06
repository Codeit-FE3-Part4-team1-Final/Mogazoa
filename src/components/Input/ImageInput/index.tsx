import Image from 'next/image';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  image: string | null;
  register?: UseFormRegisterReturn;
  resetFile?: () => void;
  error?: boolean;
}

export default function ImageInput({
  image,
  register,
  resetFile,
  error,
  ...rest
}: Props) {
  return (
    <div className={cx('wrapper')}>
      {image && (
        <Image
          src={'/images/close-icon.svg'}
          alt='close-icon'
          width={30}
          height={30}
          className={cx('close-icon')}
          onClick={resetFile}
        />
      )}
      <label
        className={cx('input-label', error ? 'error' : null)}
        htmlFor='profile-image'
      >
        {image ? (
          <Image
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={image}
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
        {...rest}
      />
    </div>
  );
}
