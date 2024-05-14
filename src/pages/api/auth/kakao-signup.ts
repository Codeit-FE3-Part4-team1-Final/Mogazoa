import { NextApiRequest, NextApiResponse } from 'next';
import { SignInResponse, SignUpWithOauthRequestBody } from '@/types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { code, state } = req.query;

    if (!code) {
      throw new Error('failed to login to Kakao');
    }
    const body: SignUpWithOauthRequestBody = {
      nickname: state! as string,
      redirectUri: `https://mogazoa4-1.vercel.app/api/auth/kakao-signup`,
      token: code,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/auth/signUp/kakao`,
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
    } else {
      throw new Error('카카오 회원가입 에러');
    }
  } catch (error) {
    res.status(500).json('failed to sign up');
  }
}
