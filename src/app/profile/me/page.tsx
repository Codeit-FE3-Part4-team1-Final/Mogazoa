import ActivityCard from '@/components/Card/ActivityCard';
import ProfileCard from '@/components/Card/ProfileCard';
import { UserDetail } from '@/types/types';

// 임시 데이터
const userDetail: UserDetail = {
  id: 1,
  nickname: '코드잇',
  description: '안녕하세요. 제가 첫번째 유저인가요? 하하하 ',
  image: null,
  createdAt: '2024-01-29T09:08:53.561Z',
  updatedAt: '2024-01-29T09:08:53.561Z',
  teamId: 'default',
  isFollowing: false,
  followersCount: 873,
  followeesCount: 143,
  reviewCount: 139,
  averageRating: 3.8,
  mostFavoriteCategory: {
    name: '영화/드라마',
    id: 2,
  },
};

export default function page() {
  return (
    <main>
      <ActivityCard category='star' rating={userDetail.averageRating} />
      <ActivityCard category='review' rating={userDetail.reviewCount} />
      <ActivityCard
        category='interest'
        productCategory={userDetail.mostFavoriteCategory?.name}
      />
      <ProfileCard userDetail={userDetail} />
    </main>
  );
}
