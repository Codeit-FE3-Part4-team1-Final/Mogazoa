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
    return null;
  }

  const method = isFavorite ? 'DELETE' : 'POST';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/${productId}/favorite`,
      {
        method,
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
