'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import CompareInput from '@/components/Input/CompareInput';
import Table from '@/components/Table';

export default function ComparePage() {
  const [subjectProduct, setSubjectProduct] = useState<any>();
  const [objectProduct, setObjectProduct] = useState<any>();
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleSubject = (data: string) => {
    setSubjectProduct(data);
  };

  const handleObject = (data: string) => {
    setObjectProduct(data);
  };

  const handleClose = () => setIsShow(false);

  return (
    <>
      <div>
        <CompareInput
          isSubject={true}
          handleUpdate={handleSubject}
          handleClose={handleClose}
        />
        <CompareInput
          isSubject={false}
          handleUpdate={handleObject}
          handleClose={handleClose}
        />
      </div>
      {isShow && (
        <Table SubjectProduct={subjectProduct} ObjectProduct={objectProduct} />
      )}
    </>
  );
}
