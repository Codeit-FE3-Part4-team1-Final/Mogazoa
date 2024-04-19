import { axiosPostJson } from '@/utils/fetchUtils';

interface SignInData {
  email: string;
  password: string;
}

const signInUser = async ({ data }: { data: SignInData }) => {
  const res = await axiosPostJson('auth/signIn', data);
  if (!res.status) {
    console.log(res);
    localStorage.setItem('accessToken', res.accessToken);
  } else {
    console.log(res.data.message);
  }
};

export default signInUser;
