import { User } from '@/types/types';

interface Props {
  description: string | null;
  nickname: string;
  image: File | string | null;
}

const patchProfile = async (body: Props, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/users/me`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error('프로필 변경 실패');
    }

    const profile: User = await response.json();
    return profile;
  } catch (error) {
    throw new Error('프로필 변경 실패');
  }
};

export default patchProfile;
