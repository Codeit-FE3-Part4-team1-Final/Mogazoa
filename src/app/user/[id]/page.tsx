import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileSection from '@/components/Profile/ProfileSection';
import { UserDetail } from '@/types/types';
import { getMyDetail, getUserDetail } from '@/utils/getUserDetail';

interface Props {
  params: { id: string };
}

export default async function UserProfilePage({ params: { id } }: Props) {
  const token = cookies().get('accessToken');
  const userDetail: UserDetail = await getUserDetail(id);

  if (token) {
    const myDetail = await getMyDetail(token.value);
    const myId = myDetail.id.toString();
    if (id === myId) {
      redirect('/mypage');
    }
  }

  return <ProfileSection userId={id} userDetail={userDetail} />;
}
