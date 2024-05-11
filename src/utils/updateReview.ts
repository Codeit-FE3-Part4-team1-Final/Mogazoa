'use server';

import { cookies } from 'next/headers';
import { Review, UpdateReviewRequestBody } from '@/types/types.ts';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken')?.value;

const updateReview = async (
  body: UpdateReviewRequestBody,
  reviewId: number,
): Promise<Review> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/reviews/${reviewId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    return await response.json();
  } catch (error) {
    throw new Error('리뷰 수정 실패');
  }
};

export default updateReview;
