import ObjectChip from '@/components/Compare/ObjectChip';
import SubjectChip from '@/components/Compare/SubjectChip';

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
