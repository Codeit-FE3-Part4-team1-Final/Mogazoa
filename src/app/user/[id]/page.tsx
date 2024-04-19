import ProfileSection from '@/components/ProfileSection';

interface Props {
  params: { id: string };
}

export default function UserProfilePage({ params: { id } }: Props) {
  return <ProfileSection userId={id} />;
}
