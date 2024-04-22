/* eslint-disable*/

import { setCookie } from 'nookies';

export default (req: any, res: any) => {
  if (req.method === 'POST') {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    setCookie({ res }, 'accessToken', accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
