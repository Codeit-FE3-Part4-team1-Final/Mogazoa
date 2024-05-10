'use server';

import { cookies } from 'next/headers';

const getUserToken = async () => {
  const token = cookies().get('accessToken');
  return token;
};

export default getUserToken;
