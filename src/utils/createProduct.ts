import { CreateProductRequestBody } from '@/types/types';

const createProduct = async (body: CreateProductRequestBody, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/products`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    return response;
  } catch (error) {
    throw new Error('프로필 변경 실패');
  }
};

export default createProduct;
