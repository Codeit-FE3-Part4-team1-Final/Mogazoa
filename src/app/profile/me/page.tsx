import ActivityCard from '@/components/Card/ActivityCard';
import ProfileCard from '@/components/Card/ProfileCard';
import CategoryChip from '@/components/Chip/CategoryChip';

export default function page() {
  return (
    <main>
      <CategoryChip productCategory={'음악'} size='large' />
      <CategoryChip productCategory={'영화/드라마'} size='large' />
      <CategoryChip productCategory={'강의/책'} size='large' />
      <CategoryChip productCategory={'호텔'} size='large' />
      <CategoryChip productCategory={'가구/인테리어'} size='large' />
      <CategoryChip productCategory={'식당'} size='large' />
      <CategoryChip productCategory={'전자기기'} size='large' />
      <CategoryChip productCategory={'화장품'} size='large' />
      <CategoryChip productCategory={'의류/악세서리'} size='large' />
      <CategoryChip productCategory={'앱'} size='large' />
      <CategoryChip productCategory={'음악'} />
      <CategoryChip productCategory={'영화/드라마'} />
      <CategoryChip productCategory={'강의/책'} />
      <CategoryChip productCategory={'호텔'} />
      <CategoryChip productCategory={'가구/인테리어'} />
      <CategoryChip productCategory={'식당'} />
      <CategoryChip productCategory={'전자기기'} />
      <CategoryChip productCategory={'화장품'} />
      <CategoryChip productCategory={'의류/악세서리'} />
      <CategoryChip productCategory={'앱'} />
      <ActivityCard category='star' rating={4} />
      <ActivityCard category='review' rating={130} />
      <ActivityCard category='interest' productCategory={'의류/악세서리'} />
      <ProfileCard />
    </main>
  );
}
