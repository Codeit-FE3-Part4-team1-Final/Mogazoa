import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';
import { axiosGet } from './fetchUtils.ts';

const getUserProduct = async (
  id: string,
  userProductCategory: UserProductCategory,
) => {
  const response = await axiosGet(`users/${id}/${userProductCategory}`);
  return response;
};

export default getUserProduct;
