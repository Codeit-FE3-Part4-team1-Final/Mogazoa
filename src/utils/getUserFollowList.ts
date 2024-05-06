import { UserFolloweeList, UserFollowerList } from '@/types/types.ts';
import { axiosGet } from './fetchUtils.ts';

const getUserFollowerList = async (
  id: string,
  cursor: number,
): Promise<UserFollowerList> => {
  const response = await axiosGet(`users/${id}/followers?cursor=${cursor}`);
  return response;
};
const getUserFolloweeList = async (
  id: string,
  cursor: number,
): Promise<UserFolloweeList> => {
  const response = await axiosGet(`users/${id}/followees?cursor=${cursor}`);
  return response;
};

export { getUserFollowerList, getUserFolloweeList };
