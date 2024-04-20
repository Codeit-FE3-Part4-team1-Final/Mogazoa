import { useState } from 'react';

type CompareModalType = 'subject' | 'object' | 'copy' | 'changed';

interface CompareModalInterface {
  product: string;
  productId: number;
  compareModalType: CompareModalType;
}

export default function CompareModal({
  product,
  productId,
  compareModalType,
}: CompareModalInterface) {
  const [subjectProduct, setSubjectProduct] = useState<string>('');
  const [isSubjectSelected, setIsSubjectSelected] = useState<boolean>(false);
  const [objectProduct, setObjectProduct] = useState<string>('');
  const [isObjectSelected, setIsObjectSelected] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [messsage, setMessage] = useState<string>('');
}
