'use client';

import { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import UserInfoInput from '@/components/Input/UserInfoInput';
import { checkNickname } from '@/utils/userValidation';
import styles from './SignupToKakao.module.scss';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

export default function SignupToKakao() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('닉네임을 입력해주세요');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const onBlur = (value: string) => {
    const result = checkNickname(value);
    setError(result);
  };
  const onClick = () => {
    if (error) {
      return;
    }
    // OAuth 로그인 로직
    console.log(nickname);
  };
  return (
    <div className={cx('wrapper')}>
      <UserInfoInput
        labelName='닉네임'
        value={nickname}
        onChange={(event) => onChange(event)}
        onBlur={() => onBlur(nickname)}
        error={error}
      />
      <Button category='primary' onClick={onClick}>
        가입하기
      </Button>
    </div>
  );
}
