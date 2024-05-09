import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileSection from '@/components/Profile/ProfileSection';
import { UserDetail } from '@/types/types';
import { getMyDetail } from '@/utils/getUserDetail';

export default async function MyProfilePage() {
  const token = cookies().get('accessToken');

  if (!token) {
    redirect('/signin');
  }

  const myDetail: UserDetail = await getMyDetail(token.value);
  const id = myDetail.id.toString();

  return (
    <ProfileSection
      userId={id}
      userDetail={myDetail}
      isLoggedIn
      token={token.value}
    />
  );
}
