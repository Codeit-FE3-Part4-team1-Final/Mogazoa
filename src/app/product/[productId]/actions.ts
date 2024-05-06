'use server';

import { cookies } from 'next/headers';
import { ProductDetailType } from '@/types/types.ts';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken');

export const fetchProductData = async (
  productId: string,
): Promise<ProductDetailType> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken.value}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/${productId}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Server error occurred');
  }

  return response.json();
};

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
