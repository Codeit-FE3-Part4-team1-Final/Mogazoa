import { NextApiRequest, NextApiResponse } from 'next';
import { SignInResponse, SignInWithOauthRequestBody } from '@/types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { code } = req.query;
    console.log('인가코드 : ', code);

    if (!code) {
      throw new Error('failed to login to Kakao');
    }
    const body: SignInWithOauthRequestBody = {
      redirectUri: 'http://localhost:3000/api/auth/kakao',
      token: code,
    };
    console.log('request body: ', body);

    const response = await fetch(
      `https://mogazoa-api.vercel.app/3-1/auth/signIn/kakao`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const result: SignInResponse = await response.json();
    console.log(result);

    if (response.ok) {
      res.setHeader(
        'Set-Cookie',
        `accessToken=${result.accessToken}; Path=/; HttpOnly; Secure`,
      );
      res.redirect('/');
    } else if (response.status === 403) {
      res.redirect('/oauth/signup/kakao');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('failed to sign up');
  }
}
