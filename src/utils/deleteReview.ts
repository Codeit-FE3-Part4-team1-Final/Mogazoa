'use server';

import { cookies } from 'next/headers';
import { Review } from '@/types/types.ts';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken')?.value;

const deleteReview = async (reviewId: number): Promise<Review> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/reviews/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return await response.json();
  } catch (error) {
    throw new Error('리뷰 삭제 실패');
  }
};

export default deleteReview;
