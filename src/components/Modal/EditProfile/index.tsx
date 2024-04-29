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
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [userImage, setUserImage] = useState(userDetail.image);
  const [userName, setUserName] = useState(userDetail.nickname);
  const [description, setDescription] = useState(userDetail.description);

  const {
    register,
    handleSubmit,
    setError,
    reset,
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    if (file?.size > FILE_MAX_SIZE) {
      alert('파일의 용량은 최대 5MB 입니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setUserImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOnBlurUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('nickname', { message: '닉네임은 필수 입력입니다.' });
    }
  };

  const resetFile = () => {
    reset({ image: null });
    setUserImage(null);
    console.log(userImage);
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
        <ImageInput
          userImage={userImage}
          register={register('image', {
            onChange: handleFileChange,
          })}
          resetFile={resetFile}
        />
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
