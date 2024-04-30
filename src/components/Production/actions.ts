'use server';

import { cookies } from 'next/headers';

export default async function toggleFavorite({
  productId,
  isFavorite,
}: {
  productId: number;
  isFavorite: boolean;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    console.error('Access token is missing');
    return null; // 또는 적절한 에러 처리
  }

  console.log(`Access Token: ${accessToken.value}`);
  console.log(`Product ID: ${productId}, Is Favorite: ${isFavorite}`);

  const method = isFavorite ? 'DELETE' : 'POST';

  try {
    const response = await fetch(
      `https://mogazoa-api.vercel.app/3-1/products/${productId}/favorite`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    );

    console.log('Response Status:', response);
    return await response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return null;
  }
}
