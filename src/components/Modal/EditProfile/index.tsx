'use client';

import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

interface Form {
  description: string | null;
  nickname: string;
  image: string | null;
}

export default function EditProfile({ userDetail }: Props) {
  const [userImage, setUserImage] = useState(userDetail.image);
  const [userName, setUserName] = useState(userDetail.nickname);
  const [description, setDescription] = useState(userDetail.description);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onBlur',
  });

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      return;
    }
    setUserName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleOnBlurUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('nickname', { message: '닉네임은 필수 입력입니다.' });
    }
  };

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
  };

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>프로필 편집</span>
      <form
        className={cx('edit-profile-form')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ImageInput userImage={userImage} />
        <TextFieldInput
          register={register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            onBlur: handleOnBlurUserName,
            onChange: handleChangeUserName,
          })}
          value={userName}
          placeholder={
            errors.nickname
              ? errors.nickname.message
              : '닉네임을 입력해 주세요.'
          }
        >
          <p className={cx('nickname-count')}>{userName.length}/10</p>
        </TextFieldInput>
        <TextBoxInput
          register={register('description', {
            onChange: handleChangeDescription,
          })}
          placeholder='프로필 소개를 입력해 주세요.'
          value={description}
        />
        <Button category='primary' type='submit'>
          저장하기
        </Button>
      </form>
    </div>
  );
}
