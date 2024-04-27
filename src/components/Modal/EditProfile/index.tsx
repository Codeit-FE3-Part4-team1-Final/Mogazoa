'use client';

import { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

export default function EditProfile() {
  const [userName, setUserName] = useState('');
  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>프로필 편집</span>
      <form className={cx('edit-profile-form')}>
        <input type='file' />
        <input type='text' value={userName} onChange={handleChangeUserName} />
      </form>
      <Button category='primary'>저장하기</Button>
    </div>
  );
}
