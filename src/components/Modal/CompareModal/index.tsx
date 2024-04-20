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

  const handleChange = () => {
    if (isSubjectSelected) {
      localStorage.setItem('objectProductId', String(productId));
      localStorage.setItem('objectProduct', product);
    } else {
      localStorage.setItem('subjectProductId', String(productId));
      localStorage.setItem('subjectProduct', product);
    }
    setIsChanged(true);
  };

  const subjectSelected = () => {
    setIsSubjectSelected(true);
    setIsObjectSelected(false);
  };

  const objectSelected = () => {
    setIsSubjectSelected(false);
    setIsObjectSelected(true);
  };
}
