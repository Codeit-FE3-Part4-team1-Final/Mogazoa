'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import getProduct from '@/apis/getProduct';
import styles from './ObjectInput.module.scss';
import ObjectChip from '@/components/Chip/ObjectChip';
import getProductDetail from '@/apis/getProductDetail';

const cx = classNames.bind(styles);

interface ObjectInputInterface {
  handleUpdate: (name: string) => void;
  handleClose: () => void;
}

export default function ObjectInput({
  handleUpdate,
  handleClose,
}: ObjectInputInterface) {
  const [objectProduct, setObjectProduct] = useState<string>('');
  const [productId, setProductId] = useState<number>(0);
  const [objectChip, setObjectChip] = useState<string>('');
  const [isChip, setIsChip] = useState<boolean>(false);
  const [isReadable, setIsReadable] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('objectProduct')) {
      setObjectProduct(localStorage.getItem('objectProduct') as string);
      setProductId(Number(localStorage.getItem('objectProductId')));
      setObjectChip(localStorage.getItem('objectProduct') as string);
      setIsChip(true);
      setIsReadable(true);
      setObjectProduct('');
    }
  }, []);

  const handleDelete = () => {
    setIsChip(false);
    setIsReadable(false);
    handleClose();
    handleUpdate('');
    localStorage.removeItem('objectProduct');
    localStorage.removeItem('objectProductId');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setObjectProduct(event.target.value);
    setObjectChip(event.target.value);
    setIsReadable(false);
    if (event.target.value === '') {
      handleDelete();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const objectProductValue = event.currentTarget.innerText;
    setObjectProduct('');
    setObjectChip(objectProductValue);
    setIsReadable(true);
    setIsChip(true);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && objectProduct.trim() !== '') {
      setObjectProduct('');
      setObjectChip(objectProduct);
      setIsReadable(true);
      setIsChip(true);
    }
  };

  const { data: objectData, isSuccess } = useQuery({
    queryKey: ['products', { keyword: objectChip }],
    queryFn: () => getProduct({ keyword: objectChip }),
    enabled: !!objectChip,
  });

  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', productId, objectProduct],
    queryFn: () => getProductDetail(productId),
  });

  useEffect(() => {
    handleUpdate(productDetail as any);
    if (productDetail) {
      localStorage.setItem('objectProduct', productDetail?.name);
      localStorage.setItem('objectProductId', String(productDetail?.id));
    }
  }, [productDetail]);

  useEffect(() => {
    setIsShow(false);
    if (isSuccess) {
      if (objectProduct === '') {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    }
  }, [isSuccess, objectProduct, objectChip]);

  return (
    <div className={cx('container')}>
      <label className={cx('label')}>상품2</label>
      <div className={cx('input-container')}>
        <input
          onChange={handleChange}
          value={objectProduct}
          onKeyDown={handleEnter}
          readOnly={isReadable}
          className={cx('input')}
        />
        {isChip && (
          <div onClick={handleDelete} className={cx('chip-container')}>
            <ObjectChip name={objectChip} />
          </div>
        )}
      </div>
      {isShow && (
        <ul className={cx('list-container')}>
          {objectData?.list?.map((values) => (
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
