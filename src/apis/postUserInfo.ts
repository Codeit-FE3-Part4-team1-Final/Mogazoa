'use server';

import { cookies } from 'next/headers';
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

interface SignErrorResponse {
  data: string;
}

// todo(송상훈) : 토스트나 모달로 실패 메세지 처리하기

export const signInUser = async ({ data }: { data: SignInData }) => {
  const res = (await axiosPostJson('auth/signIn', data)) as
    | SignInResponse
    | SignErrorResponse;

  if ('accessToken' in res) {
    cookies().set('accessToken', res.accessToken);

    return { success: true, accessToken: res.accessToken };
  }

  return { success: false, error: res.data };
};

export const signUpUser = async ({ data }: { data: SignUpData }) => {
  const res = (await axiosPostJson('auth/signUp', data)) as
    | SignInResponse
    | SignErrorResponse;

  if ('accessToken' in res) {
    return { success: true };
  }

  return { success: false, error: res.data };
};
