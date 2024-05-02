import { ProductCategory } from '@/types/types';

const convertCategoryToEnglish = (category: ProductCategory): string => {
  switch (category) {
    case '음악':
      return 'music';
    case '영화/드라마':
      return 'drama';
    case '강의/책':
      return 'book';
    case '호텔':
      return 'hotel';
    case '가구/인테리어':
      return 'interior';
    case '식당':
      return 'restaurant';
    case '전자기기':
      return 'electronics';
    case '화장품':
      return 'cosmetic';
    case '의류/악세서리':
      return 'cloth';
    case '앱':
      return 'app';
    case '없음':
      return 'null';
    default:
      return '';
  }
};

export default convertCategoryToEnglish;
