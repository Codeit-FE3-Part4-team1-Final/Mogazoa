'use client';

import { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';

const cx = classNames.bind(styles);

export default function EditProfile() {
  const [userName, setUserName] = useState('');
  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleOnBlur = () => {
    console.log('blur');
  };

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>프로필 편집</span>
      <form className={cx('edit-profile-form')}>
        <ImageInput />
        <TextFieldInput
          onBlur={handleOnBlur}
          value={userName}
          onChange={handleChangeUserName}
          placeholder='닉네임을 입력해 주세요'
        />
      </form>
      <Button category='primary'>저장하기</Button>
    </div>
  );
}
