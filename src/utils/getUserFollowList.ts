import { axiosGet } from './fetchUtils.ts';

const getUserFollowerList = async (id: string) => {
  const response = await axiosGet(`users/${id}/followers`);
  return response;
};
const getUserFolloweeList = async (id: string) => {
  const response = await axiosGet(`users/${id}/followees`);
  return response;
};

export { getUserFollowerList, getUserFolloweeList };
