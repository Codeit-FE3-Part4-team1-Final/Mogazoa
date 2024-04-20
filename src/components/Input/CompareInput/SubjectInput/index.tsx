'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import SubjectChip from '@/components/Chip/SubjectChip';
import getProduct from '@/apis/getProduct';
import styles from './SubjectInput.module.scss';
import getProductDetail from '@/apis/getProductDetail';

const cx = classNames.bind(styles);

interface SubjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function SubjectInput({
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
      setProductId(Number(localStorage.getItem('subjectProductId')));
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
    localStorage.removeItem('subjectProduct');
    localStorage.removeItem('subjectProductId');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectProduct(event.target.value);
    setSubjectChip(event.target.value);
    setIsReadable(false);
    if (event.target.value === '') {
      handleDelete();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const subjectProductValue = event.currentTarget.innerText;
    setSubjectProduct('');
    setSubjectChip(subjectProductValue);
    setIsReadable(true);
    setIsChip(true);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && subjectProduct.trim() !== '') {
      setSubjectProduct('');
      setSubjectChip(subjectProduct);
      setIsReadable(true);
      setIsChip(true);
    }
  };

  const { data: subjectData, isSuccess } = useQuery({
    queryKey: ['products', { keyword: subjectChip }],
    queryFn: () => getProduct({ keyword: subjectChip }),
    enabled: !!subjectChip,
  });

  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', productId, subjectProduct],
    queryFn: () => getProductDetail(productId),
  });

  useEffect(() => {
    handleUpdate(productDetail as any);
    if (productDetail) {
      localStorage.setItem('subjectProduct', productDetail?.name);
      localStorage.setItem('subjectProductId', String(productDetail?.id));
    }
  }, [productDetail]);

  useEffect(() => {
    setIsShow(false);
    if (isSuccess) {
      if (subjectProduct === '') {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    }
  }, [isSuccess, subjectProduct, subjectChip]);

  return (
    <div className={cx('container')}>
      <label className={cx('label')}>상품1</label>
      <div className={cx('input-container')}>
        <input
          onChange={handleChange}
          value={subjectProduct}
          onKeyDown={handleEnter}
          readOnly={isReadable}
          className={cx('input')}
        />
        {isChip && (
          <div onClick={handleDelete} className={cx('chip-container')}>
            <SubjectChip name={subjectChip} />
          </div>
        )}
      </div>
      {isShow && (
        <ul className={cx('list-container')}>
          {subjectData?.list?.map((values) => (
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
