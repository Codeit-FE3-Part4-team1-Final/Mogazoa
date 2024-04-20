import useAuthStore from '@/stores/userStore';
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
    useAuthStore.getState().setLogin(res.accessToken);
    return true;
  }
  console.log(res);
  return false;
};

export const signUpUser = async ({ data }: { data: SignUpData }) => {
  const res = await axiosPostJson('auth/signUp', data);
  if (res.user) {
    localStorage.setItem('accessToken', res.accessToken);
    useAuthStore.getState().setLogin(res.accessToken);
    return true;
  }
  console.log(res.data.message);
  return false;
};
