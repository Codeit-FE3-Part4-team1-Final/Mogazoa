/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ObjectChip from '@/components/Chip/ObjectChip';
import SubjectChip from '@/components/Chip/SubjectChip';
import { getDetail, getProduct } from '@/apis/getProduct';

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
    queryFn: () => getProduct({ keyword: chip }),
    enabled: !!chip,
  });

  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', productId, product],
    queryFn: () => getDetail(productId),
  });

  useEffect(() => {
    handleUpdate(productDetail as any);
    if (productDetail) {
      localStorage.setItem(
        isSubject ? 'subjectProduct' : 'objectProduct',
        productDetail?.name,
      );
      localStorage.setItem(
        `${isSubject ? 'subjectProduct' : 'objectProduct'}Id`,
        String(productDetail?.id),
      );
    }
  }, [productDetail, isSubject]);

  useEffect(() => {
    if (isSuccess) {
      if (product === '') {
        setIsChip(false);
      } else {
        setIsChip(true);
      }
    }
  }, [isSuccess, product]);

  return (
    <div>
      <span>{isSubject ? '상품1' : '상품2'}</span>
      <div>
        <input
          onChange={handleChange}
          value={product}
          onKeyDown={handleEnter}
          readOnly={isReadable}
        />
        {isChip && (
          <div onClick={handleDelete}>
            {isSubject ? (
              <SubjectChip name={chip} />
            ) : (
              <ObjectChip name={chip} />
            )}
          </div>
        )}
      </div>
      {isSuccess && <ul>{/* productData에서 리스트 map */}</ul>}
    </div>
  );
}
