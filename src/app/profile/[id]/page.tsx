import ActivityCard from '@/components/Card/ActivityCard';

export default function page() {
  return (
    <div>
      프로필 페이지
      <ActivityCard category='star' rating={4} />
      <ActivityCard category='review' rating={130} />
      <ActivityCard category='interest' productCategory={'의류/악세서리'} />
    </div>
  );
}
