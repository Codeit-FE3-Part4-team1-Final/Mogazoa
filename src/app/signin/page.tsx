'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import Image from 'next/image';
import PasswordInput from '@/components/Input/PasswordInput';
import UserInfoInput from '@/components/Input/UserInfoInput';
import styles from './signin.module.scss';
import Button from '@/components/Button';
import { checkSignEmail, checkSignPassword } from '@/utils/userValidation';
import { signInUser } from '@/apis/postUserInfo';
import signinToKakao from '@/utils/signinToKakao';

const cx = classNames.bind(styles);

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailErrorMessage = checkSignEmail(email);
    const passwordErrorMessage = checkSignPassword(password);
    setEmailError(emailErrorMessage);
    setPasswordError(passwordErrorMessage);

    const result = await signInUser({ data: { email, password } });

    if (result.success === true && result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      router.push('/');
    } else {
      // todo(송상훈):로그인 실패했을때 error 사용해서 로직 처리할것
      console.log(result.error);
    }
  };

  const handleEmailBlur = () => {
    const message = checkSignEmail(email);
    setEmailError(message);
  };

  const handlePasswordBlur = () => {
    const message = checkSignPassword(password);
    setPasswordError(message);
  };

  return (
    <div>
      <main className={cx('form-container')}>
        <form className={cx('form-input-area')} onSubmit={onSubmit}>
          <UserInfoInput
            labelName='이메일'
            error={emailError}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onBlur={handleEmailBlur}
          />
          <PasswordInput
            labelName='비밀번호'
            error={passwordError}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            onBlur={handlePasswordBlur}
          />
          <div className={cx('input-button')}>
            <Button category='primary' type='submit'>
              로그인
            </Button>
          </div>
        </form>
        <div className={cx('sns-area')}>
          <span className={cx('sns-text')}>SNS로 바로 시작하기</span>
          <div className={cx('sns-images')}>
            <div className={cx('sns-circle')}>
              <Image
                className={cx('sns-image')}
                src='./images/google-icon.svg'
                alt='구글아이콘'
                width={32}
                height={32}
              />
            </div>
            <div className={cx('sns-circle')} onClick={signinToKakao}>
              <Image
                className={cx('sns-image')}
                src='./images/kakao-icon.svg'
                alt='카카오아이콘'
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
