'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import PasswordInput from '@/components/Input/PasswordInput';
import UserInfoInput from '@/components/Input/UserInfoInput';
import styles from './signup.module.scss';
import Button from '@/components/Button';
import {
  checkNickname,
  checkPasswordConfirmation,
  checkSignEmail,
  checkSignPassword,
} from '@/utils/userValidation';
import { signUpUser } from '@/apis/postUserInfo';

const cx = classNames.bind(styles);

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface Errors {
  emailError: string;
  nicknameError: string;
  passwordError: string;
  passwordConfirmationError: string;
}

type ValidateFunction = (...args: string[]) => string;

export default function SignUpPage() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<Errors>({
    emailError: '',
    nicknameError: '',
    passwordError: '',
    passwordConfirmationError: '',
  });

  const handleBlur = (
    validateFunction: ValidateFunction,
    errorType: keyof Errors,
    ...param: string[]
  ): void => {
    const result = validateFunction(...param);
    setErrors((prev) => ({ ...prev, [errorType]: result }));
  };

  const onChange = (formValueType: keyof FormValues, value: string): void => {
    setFormValues((prev) => ({
      ...prev,
      [formValueType]: value,
    }));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const message = checkPasswordConfirmation(
      formValues.password,
      formValues.passwordConfirmation,
    );
    if (message !== '') {
      setErrors((prev) => ({ ...prev, passwordConfirmedError: message }));
      return;
    }

    const result = await signUpUser({ data: formValues });

    if (result.success === true) {
      router.push('/signin');
    } else {
      // todo(송상훈):회원가입 실패했을때 error 사용해서 로직 처리할것
      console.log(result.error);
    }
  };

  return (
    <div>
      <main className={cx('form-container')}>
        <form className={cx('form-input-area')} onSubmit={onSubmit}>
          <UserInfoInput
            labelName='이메일'
            error={errors.emailError}
            value={formValues.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange('email', e.target.value)
            }
            onBlur={() =>
              handleBlur(checkSignEmail, 'emailError', formValues.email)
            }
          />
          <UserInfoInput
            labelName='닉네임'
            error={errors.nicknameError}
            value={formValues.nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange('nickname', e.target.value)
            }
            onBlur={() =>
              handleBlur(checkNickname, 'nicknameError', formValues.nickname)
            }
          />
          <PasswordInput
            labelName='비밀번호'
            error={errors.passwordError}
            value={formValues.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange('password', e.target.value)
            }
            onBlur={() =>
              handleBlur(
                checkSignPassword,
                'passwordError',
                formValues.password,
              )
            }
          />
          <PasswordInput
            labelName='비밀번호 확인'
            error={errors.passwordConfirmationError}
            value={formValues.passwordConfirmation}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange('passwordConfirmation', e.target.value)
            }
            onBlur={() =>
              handleBlur(
                checkPasswordConfirmation,
                'passwordConfirmationError',
                formValues.password,
                formValues.passwordConfirmation,
              )
            }
          />
          <div className={cx('input-button')}>
            <Button category='primary' type='submit'>
              가입하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
