'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import ObjectChip from '@/components/Chip/ObjectChip';
import SubjectChip from '@/components/Chip/SubjectChip';
import { getDetail, getProduct } from '@/apis/getProduct';
import styles from './CompareInput.module.scss';

const cx = classNames.bind(styles);

interface SubjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function CompareInput({
  handleUpdate,
  handleClose,
}: SubjectInputInterface) {
  const [subjectProduct, setSubjectProduct] = useState<string>('');
  const [productId, setProductId] = useState<number>(0);
  const [subjectChip, setSubjectChip] = useState<string>('');
  const [isChip, setIsChip] = useState<boolean>(false);
  const [isReadable, setIsReadable] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('subjectProduct')) {
      setSubjectProduct(localStorage.getItem('subjectProduct') as string);
      setProductId(Number(localStorage.getItem('productId')));
      setSubjectChip(localStorage.getItem('subjectProduct') as string);
      setIsChip(true);
      setIsReadable(true);
      setSubjectProduct('');
    }
  }, []);

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
    <div className={cx('container')}>
      <label className={cx('label')}>{isSubject ? '상품1' : '상품2'}</label>
      <div className={cx('input-container')}>
        <input
          onChange={handleChange}
          value={product}
          onKeyDown={handleEnter}
          readOnly={isReadable}
          className={cx('input')}
        />
        {isChip && (
          <div onClick={handleDelete} className={cx('chip-container')}>
            {isSubject ? (
              <SubjectChip name={chip} />
            ) : (
              <ObjectChip name={chip} />
            )}
          </div>
        )}
      </div>
      {isSuccess && (
        <ul className={cx('list-container')}>
          {productData?.list?.map((values) => (
            <li
              key={values.id}
              onClick={(event) => {
                handleClick(event as any);
                setProductId(values.id);
              }}
              className={cx('list')}
            >
              {values.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
