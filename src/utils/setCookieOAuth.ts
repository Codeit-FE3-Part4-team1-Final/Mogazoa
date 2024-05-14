'use server';

import { cookies } from 'next/headers';

const setCookieOAuth = async (accessToken: string) => {
  cookies().set('accessToken', accessToken);
};

export default setCookieOAuth;
