import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';
import { axiosGet } from './fetchUtils.ts';
import { SearchProductResponse } from '@/types/types.ts';

const getUserProduct = async (
  id: string,
  cursor: unknown,
  userProductCategory: UserProductCategory,
): Promise<SearchProductResponse> => {
  const response = await axiosGet(
    `users/${id}/${userProductCategory}?cursor=${cursor}`,
  );
  return response;
};

export default getUserProduct;
