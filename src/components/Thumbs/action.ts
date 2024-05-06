'use server';

import { cookies } from 'next/headers';

export default async function toggleLike(reviewId: number, isLiked: boolean) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const method = isLiked ? 'DELETE' : 'POST';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/reviews/${reviewId}/like`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      return result; // { isLiked: boolean, likeCount: number }
    }
    return null;
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return null;
  }
}
