import { SearchProductResponse } from '@/types/types';

const validateProductName = async (keyword: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/?keyword=${keyword}`,
  );

  const product: SearchProductResponse = await response.json();
  if (product.list.length !== 0) {
    return false;
  }
  return true;
};

export default validateProductName;
