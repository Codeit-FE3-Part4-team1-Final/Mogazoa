'use client';

import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import { UserDetail } from '@/types/types';
import useEditProfile from '@/hooks/useEditProfile';

const cx = classNames.bind(styles);

interface Props {
  userDetail: UserDetail;
}

export default function EditProfile({ userDetail }: Props) {
  const {
    userImage,
    userName,
    userDescription,
    handleChangeUserName,
    handleChangeDescription,
    handleFileChange,
    handleOnBlurUserName,
    resetFile,
    onSubmit,
    register,
    handleSubmit,
    errors,
  } = useEditProfile(userDetail);

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
          value={userDescription}
        />
        <Button category='primary' type='submit'>
          저장하기
        </Button>
      </form>
    </div>
  );
}
