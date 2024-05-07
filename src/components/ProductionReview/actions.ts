'use server';

import { cookies } from 'next/headers';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken');

export default async function getReview(productId: number, order: string) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken.value}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/${productId}/reviews?order=${order}`,
      {
        method: 'GET',
        headers,
      },
    );

    return await response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return null;
  }
}
