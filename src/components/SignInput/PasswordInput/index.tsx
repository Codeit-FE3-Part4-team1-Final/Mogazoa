'use client';

import { ChangeEvent, FocusEvent, useState } from 'react';
import Image from 'next/image';
import eyeOn from '../../../../public/images/eyes-open.svg';
import eyeOff from '../../../../public/images/eyes-close.svg';
import styles from './PasswordInput.module.scss';

const EYE_ON = {
  src: eyeOn,
  alt: '비밀번호 보이기',
};
const EYE_OFF = {
  src: eyeOff,
  alt: '비밀번호 가리기',
};

interface InputProps {
  labelName: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  labelName,
  error,
  value,
  onChange,
  onBlur,
}: InputProps) {
  const [eyes, setEyes] = useState(EYE_OFF);

  const changeEye = () => {
    if (eyes.alt === EYE_OFF.alt) {
      setEyes(EYE_ON);
      return;
    }
    setEyes(EYE_OFF);
  };

  return (
    <div className={styles['input-container']}>
      <label htmlFor={labelName}>{labelName}</label>
      <div className={styles['image-guide']}>
        <input
          className={styles['input-main']}
          type={eyes.alt === EYE_OFF.alt ? 'password' : 'text'}
          id={labelName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder='비밀번호를 입력해주세요.'
          autoComplete='new-password'
        />
        <Image
          className={styles['input-image']}
          onClick={changeEye}
          src={eyes.src}
          alt={eyes.alt}
          width={24}
          height={24}
        />
      </div>
      <span className={styles[`input-error`]}>{error}</span>
    </div>
  );
}
