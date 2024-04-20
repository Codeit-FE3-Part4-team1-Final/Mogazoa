/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';

type CompareModalType = 'subject' | 'object' | 'exist' | 'changed';

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

  useEffect(() => {
    if (localStorage.getItem('subjectProduct')) {
      setSubjectProduct(localStorage.getItem('subjectProduct') as string);
    } else if (localStorage.getItem('objectProduct')) {
      setObjectProduct(localStorage.getItem('objectProduct') as string);
    }

    switch (compareModalType) {
      case 'subject':
      case 'object':
        setMessage(`${product} 항목이 등록되었습니다.`);
        break;

      case 'exist':
        setMessage('이미 등록한 상품입니다.');
        break;

      case 'changed':
        setMessage(`지금 보고 있는 ${product}`);
        break;
    }
  }, []);

  const preventEventBubbling = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
}
