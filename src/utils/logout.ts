'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logout = async () => {
  cookies().delete('accessToken');
  redirect('/');
};

export default logout;
