import { NextApiRequest, NextApiResponse } from 'next';
import { SignInResponse, SignInWithOauthRequestBody } from '@/types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { code } = req.query;

    if (!code) {
      throw new Error('failed to login to Kakao');
    }
    const body: SignInWithOauthRequestBody = {
      redirectUri: 'http://localhost:3000/api/auth/kakao-signin',
      token: code,
    };

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
    res.status(500).json('failed to sign up');
  }
}
