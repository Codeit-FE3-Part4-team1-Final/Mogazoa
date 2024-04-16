/* eslint-disable @typescript-eslint/no-explicit-any */
import CompareInput from '@/components/Input/CompareInput';

interface ComparePageInterface {
  subjectProduct: any;
  objectProduct: any;
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function ComparePage() {
  return (
    <>
      <div>
        <CompareInput isSubject={true} handleUpdate={} handleClose={} />
      </div>
    </>
  );
}
