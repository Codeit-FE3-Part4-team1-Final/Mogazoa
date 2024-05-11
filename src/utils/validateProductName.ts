import { SearchProductResponse } from '@/types/types';

const validateProductName = async (keyword: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_HOST}/products/?keyword=${keyword}`,
  );

  const productList: SearchProductResponse = await response.json();

  if (!productList || productList.list.length === 0) {
    return true;
  }

  const keywordWithoutSpaces = keyword.replace(/\s/g, '').toLowerCase();

  const hasMatchingProduct = productList.list.some((product) => {
    const productNameWithoutSpaces = product.name
      .replace(/\s/g, '')
      .toLowerCase();

    return productNameWithoutSpaces === keywordWithoutSpaces;
  });

  return !hasMatchingProduct;
};

export default validateProductName;
