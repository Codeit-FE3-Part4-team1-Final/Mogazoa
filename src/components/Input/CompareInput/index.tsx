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

  // 로컬 스토리지에 해당 상품이 있을 경우 -> 초기 상태 설정
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

  // chip 제거 로직 -> 해당 상품값과 Id값 제거
  // 삭제 후 다시 입력 가능
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

  // 리스트 내 상품 값 클릭 이벤트
  // 상품들 리스트로 보여줌 -> 그 중에서 선택하면 상태 업데이트
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

  // useQuery 비동기 데이터 (아직 더 학습필요)
  const { data: productData, isSuccess } = useQuery({
    queryKey: ['products', { keyword: chip }], // 식별키 -> 상품 목록 가져오기
    queryFn: () => getProduct({ keyword: chip }), // 여기서 데이터 실제로 가져옴
    enabled: !!chip, // 활성화
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
