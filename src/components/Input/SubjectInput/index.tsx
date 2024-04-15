import { useState } from 'react';

interface SubjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function SubjectInput({
  handleUpdate,
  handleClose,
}: SubjectInputInterface) {
  const [subjectProduct, setSubejctProduct] = useState<string>('');
  const [subjectProductId, setSubjectProductId] = useState<number>(0);
  const [subjectChip, setSubjectChip] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isChip, setIsChip] = useState<boolean>(false);
  const [isReadable, setIsReadable] = useState<boolean>(false);
}
