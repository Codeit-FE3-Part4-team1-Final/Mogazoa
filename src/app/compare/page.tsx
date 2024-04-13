import ObjectChip from '@/components/Chip/ObjectChip';
import SubjectChip from '@/components/Chip/SubjectChip';

export default function ComparePage() {
  return (
    <>
      <div>
        <SubjectChip name={'비교 상품'} />
      </div>
      <div>
        <ObjectChip name={'비교 상품'} />
      </div>
    </>
  );
}
