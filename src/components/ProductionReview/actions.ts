'use server';

import { cookies } from 'next/headers';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken');

export async function getReview(productId: string, order: string) {
  if (!accessToken) {
    console.error('Access token is missing');
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/${productId}/reviews?order=${order}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return null;
  }
}

export async function fetchUserInfo() {
  if (!accessToken) {
    console.error('Access token is missing');
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return null;
  }
}
