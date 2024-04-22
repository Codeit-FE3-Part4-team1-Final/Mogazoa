import { SignInResponse } from '@/types/types';
import { axiosPostJson } from '@/utils/fetchUtils';

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// todo(송상훈) : 토스트나 모달로 실패 메세지 처리하기

export const signInUser = async ({ data }: { data: SignInData }) => {
  const res = (await axiosPostJson('auth/signIn', data)) as SignInResponse;
  if (res.user) {
    localStorage.setItem('accessToken', res.accessToken);
    // 서버 측 API 호출하여 엑세스 토큰을 쿠키로 저장
    await fetch('/api/setCookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken: res.accessToken }),
    });
    return true;
  }
  console.log(res);
  return false;
};

export const signUpUser = async ({ data }: { data: SignUpData }) => {
  const res = await axiosPostJson('auth/signUp', data);
  if (res.user) {
    localStorage.setItem('accessToken', res.accessToken);

    return true;
  }
  console.log(res.data.message);
  return false;
};
