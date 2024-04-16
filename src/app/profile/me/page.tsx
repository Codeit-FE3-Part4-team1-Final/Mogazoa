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
  reviewCount: 0,
  averageRating: 0,
  mostFavoriteCategory: null,
};

export default function page() {
  return (
    <main>
      <ActivityCard category='star' rating={4} />
      <ActivityCard category='review' rating={130} />
      <ActivityCard category='interest' productCategory={'의류/악세서리'} />
      <ProfileCard
        image={userDetail.image}
        nickname={userDetail.nickname}
        description={userDetail.description}
        followeesCount={userDetail.followeesCount}
        followersCount={userDetail.followersCount}
      />
    </main>
  );
}
