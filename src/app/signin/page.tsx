'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import NavigationBar from '@/components/NavigationBar';
import PasswordInput from '@/components/SignInput/PasswordInput';
import UserInfoInput from '@/components/SignInput/UserInfoInput';
import { checkSignEmail, checkSignPassword } from '@/utils/userValidation';
import styles from './signin.module.scss';
import Button from '@/components/Button';

export default function SignInPage() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailErrorMessage = checkSignEmail(email);
    const passwordErrorMessage = checkSignPassword(password);
    setEmailError(emailErrorMessage);
    setPasswordError(passwordErrorMessage);

    // if (emailErrorMessage !== '' || passwordErrorMessage !== '') {
    //   return;
    // }
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
    <div className={styles.wrapper}>
      <NavigationBar />
      <main className={styles['form-container']}>
        <form className={styles['form-input-area']} onSubmit={onSubmit}>
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
          <div className={styles['input-button']}>
            <Button height='65px' category='primary' type='submit'>
              로그인
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
