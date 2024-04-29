'use client';

import { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import { UserDetail } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
}

export default function EditProfile({ userDetail }: Props) {
  const [userImage, setUserImage] = useState(userDetail.image);
  const [userName, setUserName] = useState(userDetail.nickname);
  const [description, setDescription] = useState(userDetail.description);

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleChangeProfileIntroduce = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleOnBlurUserName = () => {
    console.log('blur');
  };

  const handleSetUserImage = (e) => {
    setUserImage(e.target.value);
  };

  const onSubmit = () => {
    console.log('제출');
  };

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>프로필 편집</span>
      <form className={cx('edit-profile-form')} onSubmit={onSubmit}>
        <ImageInput
          userImage={userImage}
          handleSetUserImage={handleSetUserImage}
        />
        <TextFieldInput
          onBlur={handleOnBlurUserName}
          value={userName}
          onChange={handleChangeUserName}
          placeholder='닉네임을 입력해 주세요'
        />
        <TextBoxInput
          placeholder='프로필 소개를 입력해 주세요.'
          value={description}
          onChange={handleChangeProfileIntroduce}
        />
      </form>
      <Button category='primary' type='submit'>
        저장하기
      </Button>
    </div>
  );
}
