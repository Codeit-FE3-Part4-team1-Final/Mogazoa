import { CreateProductRequestBody, ProductDetailType } from '@/types/types';

const createProduct = async (
  body: CreateProductRequestBody,
  token: string,
): Promise<ProductDetailType> => {
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
    if (!response.ok) {
      throw new Error('상품 생성 실패');
    }

    const product: ProductDetailType = await response.json();
    return product;
  } catch (error) {
    throw new Error('상품 생성 실패');
  }
};

export default createProduct;
