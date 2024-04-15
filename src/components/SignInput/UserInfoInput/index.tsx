'use client';

import { ChangeEvent, FocusEvent } from 'react';
import styles from './UserInfoInput.module.scss';

interface InputProps {
  labelName: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function UserInfoInput({
  labelName,
  error,
  value,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={labelName}>{labelName}</label>
      <input
        className={styles['input-main']}
        type='text'
        id={labelName}
        placeholder={`${labelName}을 입력해 주세요`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={styles[`input-error`]}>{error}</span>
    </div>
  );
}
