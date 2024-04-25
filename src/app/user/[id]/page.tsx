import ProfileSection from '@/components/Profile/ProfileSection';
import { UserDetail } from '@/types/types';
import { getUserDetail } from '@/utils/getUserDetail';

interface Props {
  params: { id: string };
}

export default async function UserProfilePage({ params: { id } }: Props) {
  const userDetail: UserDetail = await getUserDetail(id);
  return <ProfileSection userId={id} userDetail={userDetail} />;
}
