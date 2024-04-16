import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface SubjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
  isSubject: boolean;
}

export default function CompareInput({
  handleUpdate,
  handleClose,
  isSubject,
}: SubjectInputInterface) {
  const [product, setProduct] = useState<string>('');
  const [productId, setProductId] = useState<number>(0);
  const [chip, setChip] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isChip, setIsChip] = useState<boolean>(false);
  const [isReadable, setIsReadable] = useState<boolean>(false);

  useEffect(() => {
    const storedProduct = localStorage.getItem(
      isSubject ? 'subjectProduct' : 'objectProduct',
    );
    if (storedProduct) {
      setProduct(storedProduct);
      setProductId(Number(localStorage.getItem(`${storedProduct}Id`)));
      setChip(storedProduct);
      setIsChip(true);
      setIsReadable(true);
    }
  }, [isSubject]);

  const handleDelete = () => {
    setIsChip(false);
    setIsReadable(false);
    handleClose();
    handleUpdate('');
    localStorage.removeItem(isSubject ? 'subjectProduct' : 'objectProduct');
    localStorage.removeItem(
      `${isSubject ? 'subjectProduct' : 'objectProduct'}Id`,
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(event.target.value);
    setChip(event.target.value);
    setIsReadable(false);
    if (event.target.value === '') {
      handleDelete();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const subjectProductValue = event.currentTarget.innerText;
    setProduct('');
    setChip(subjectProductValue);
    setIsReadable(true);
    setIsChip(true);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && product.trim() !== '') {
      setProduct('');
      setChip(product);
      setIsReadable(true);
      setIsChip(true);
    }
  };

  const { data: productData, isSuccess } = useQuery({
    queryKey: ['products', { keyword: chip }],
    // queryFn: () => api호출({ keyword: chip }),
    enabled: !!chip,
  });

  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', productId, product],
    // queryFn: () => api호출(productId),
  });

  // productDetail 호출 useEffect 필요
  // productDetail 값으로 localStorage 변경

  useEffect(() => {
    if (isSuccess) {
      if (product === '') {
        setIsChip(false);
      } else {
        setIsChip(true);
      }
    }
  }, [isSuccess, product]);
}
