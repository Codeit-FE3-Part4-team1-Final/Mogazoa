import { axiosGet } from '@/utils/fetchUtils';

export default async function getCategories() {
  const res = await axiosGet('categories');

  return res;
}
