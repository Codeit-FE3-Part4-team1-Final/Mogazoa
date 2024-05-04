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
  token: string;
}

export default function EditProfile({ userDetail, token }: Props) {
  const {
    userImage,
    userName,
    userDescription,
    onChangeUserName,
    onChangeDescription,
    onChangeFile,
    onBlurUserName,
    resetFile,
    onSubmit,
    register,
    handleSubmit,
    errors,
    isPending,
  } = useEditProfile(userDetail, token);
  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>프로필 편집</span>
      <form
        className={cx('edit-profile-form')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ImageInput
          image={userImage}
          register={register('image', {
            onChange: onChangeFile,
          })}
          resetFile={resetFile}
        />
        <TextFieldInput
          register={register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            onBlur: onBlurUserName,
            onChange: onChangeUserName,
          })}
          value={userName}
          placeholder={'닉네임을 입력해 주세요.'}
          error={!!errors.nickname}
        >
          <p className={cx('nickname-count')}>{userName.length}/10</p>
        </TextFieldInput>
        <TextBoxInput
          register={register('description', {
            onChange: onChangeDescription,
          })}
          placeholder='프로필 소개를 입력해 주세요.'
          value={userDescription}
        />
        <Button category='primary' type='submit' disabled={isPending}>
          저장하기
        </Button>
      </form>
    </div>
  );
}
