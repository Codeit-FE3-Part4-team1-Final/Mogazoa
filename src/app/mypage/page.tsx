import ProfileSection from '@/components/Profile/ProfileSection';

interface Props {
  params: { id: string };
}

export default function MyProfilePage({ params: { id } }: Props) {
  return <ProfileSection userId={id} />;
}
