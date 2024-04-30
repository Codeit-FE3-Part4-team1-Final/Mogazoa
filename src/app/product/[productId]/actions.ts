'use server';

import { cookies } from 'next/headers';
import { ProductDetailType } from '@/types/types.ts';

const fetchProductData = async (
  productId: string,
): Promise<ProductDetailType> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken.value}`;
  }

  const response = await fetch(
    `https://mogazoa-api.vercel.app/3-1/products/${productId}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Server error occurred');
  }

  return response.json();
};

export default fetchProductData;
