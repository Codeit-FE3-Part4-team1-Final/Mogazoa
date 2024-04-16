import React, { useEffect, useState } from 'react';

interface SubjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function SubjectInput({
  handleUpdate,
  handleClose,
}: SubjectInputInterface) {
  const [subjectProduct, setSubjectProduct] = useState<string>('');
  const [subjectProductId, setSubjectProductId] = useState<number>(0);
  const [subjectChip, setSubjectChip] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isChip, setIsChip] = useState<boolean>(false);
  const [isReadable, setIsReadable] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('subjectProduct')) {
      setSubjectProduct(localStorage.getItem('subjectProduct') as string);
      setSubjectProductId(Number(localStorage.getItem('subjectProductId')));
      setSubjectChip(localStorage.getItem('subjectProduct') as string);
      setIsChip(true);
      setSubjectProduct('');
      setIsReadable(true);
    }
  }, []);

  const handleDelete = () => {
    setIsChip(false);
    setIsReadable(false);
    handleClose();
    handleUpdate('');
    localStorage.removeItem('subjectProduct');
    localStorage.removeItem('subjectProductId');
  };
}
