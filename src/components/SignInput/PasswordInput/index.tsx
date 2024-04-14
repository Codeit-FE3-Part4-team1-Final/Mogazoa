'use client';

import { useState } from 'react';
import Image from 'next/image';
import eyeOn from '../../../../public/images/eyes-open.svg';
import eyeOff from '../../../../public/images/eyes-close.svg';

const EYE_ON = {
  src: eyeOn,
  alt: '비밀번호 보이기',
};
const EYE_OFF = {
  src: eyeOff,
  alt: '비밀번호 가리기',
};

interface PasswordInputProps {
  labelName: string;
  // error?: string;
  // value: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  labelName,
  // error,
  // value,
  // onChange,
  // onBlur,
}: PasswordInputProps) {
  const [eyes, setEyes] = useState(EYE_OFF);

  const changeEye = () => {
    if (eyes.alt === EYE_OFF.alt) {
      setEyes(EYE_ON);
      return;
    }
    setEyes(EYE_OFF);
  };

  return (
    <div>
      <label htmlFor={labelName}>{labelName}</label>
      <div>
        <input
          type={eyes.alt === EYE_OFF.alt ? 'text' : 'password'}
          id={labelName}
          // value={value}
          // onChange={onChange}
          // onBlur={onBlur}
          placeholder='비밀번호를 입력해주세요.'
          autoComplete='password'
        />
        <Image
          onClick={changeEye}
          src={eyes.src}
          alt={eyes.alt}
          width={24}
          height={24}
        />
      </div>
      {/* <span>{error}</span> */}
    </div>
  );
}
