interface getProductInterface {
  keyword?: string | null;
  category?: number | null;
  order?: 'recent' | 'rating' | 'reviewCount' | string;
  cursor?: number | null;
  page?: number;
}

const getProduct = {};
