'use server';

import { cookies } from 'next/headers';
import { CreateReviewRequestBody, Review } from '@/types/types.ts';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken')?.value;

const createReview = async (body: CreateReviewRequestBody): Promise<Review> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/reviews`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      console.log(response);
      throw new Error('상품 생성 실패');
    }

    return await response.json();
  } catch (error) {
    throw new Error('상품 생성 실패');
  }
};

export default createReview;
