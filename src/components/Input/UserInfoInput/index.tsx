'use client';

import { ChangeEvent, FocusEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfoInput.module.scss';

interface InputProps {
  labelName: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

export default function UserInfoInput({
  labelName,
  error,
  value,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className={cx('input-container')}>
      <label className={cx('input-label')} htmlFor={labelName}>
        {labelName}
      </label>
      <input
        className={cx('input-main')}
        type='text'
        id={labelName}
        placeholder={`${labelName}을 입력해 주세요`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={cx(`input-error`)}>{error}</span>
    </div>
  );
}
