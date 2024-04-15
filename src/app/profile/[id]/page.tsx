import Button from '@/components/Button';
import ActivityCard from '@/components/Card/ActivityCard';
import CategoryChip from '@/components/Chip/CategoryChip';

export default function page() {
  return (
    <div>
      프로필 페이지
      <ActivityCard />
      <Button height='60px' category='primary'>
        버튼
      </Button>
      <CategoryChip productCategory='음악' size='large' />
    </div>
  );
}
