import { FollowRequestBody } from '@/types/types.ts';

const followUser = async (
  userId: string,
  token: string,
  method: 'POST' | 'DELETE',
) => {
  const body: FollowRequestBody = { userId: Number(userId) };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_HOST}/follow`,
    {
      method,
      headers,
      body: JSON.stringify(body),
    },
  );
  if (!response.ok) {
    throw new Error('error to follow');
  }
};

export default followUser;
