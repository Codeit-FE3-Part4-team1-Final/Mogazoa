'use client';

/* eslint-disable default-case */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CompareModal.module.scss';

const cx = classNames.bind(styles);

type CompareModalType = 'subject' | 'object' | 'exist' | 'changed';

interface CompareModalInterface {
  product: string;
  productId: number;
  compareModalType: CompareModalType;
  isSelected?: boolean;
  handleOpen: (value: boolean) => void;
}

export default function CompareModal({
  product,
  productId,
  compareModalType,
  isSelected,
  handleOpen,
}: CompareModalInterface) {
  const [subjectProduct, setSubjectProduct] = useState<string>('');
  const [isSubjectSelected, setIsSubjectSelected] = useState<boolean>(false);
  const [objectProduct, setObjectProduct] = useState<string>('');
  const [isObjectSelected, setIsObjectSelected] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

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

  const handleClose = () => handleOpen(false);

  return (
    compareModalType && (
      <div onClick={preventEventBubbling} className={cx('container')}>
        <header className={cx('header')}>
          <div className={cx('title')}>
            {!isChanged ? (
              <>
                {message}
                {compareModalType === 'changed' && (
                  <>
                    <br />
                    {'어떤 상품과 비교할까요?'}
                  </>
                )}
              </>
            ) : (
              <>
                {'비교 상품이 교체되었습니다.'}
                <br />
                {'바로 확인해 보시겠어요?'}
              </>
            )}
          </div>
        </header>
        {(compareModalType === 'subject' || compareModalType === 'exist') && (
          <button onClick={handleClose} className={cx('button')}>
            확인
          </button>
        )}
        {compareModalType === 'object' && (
          <Link href={'/compare'}>
            <button onClick={handleClose} className={cx('button')}>
              비교하기
            </button>
          </Link>
        )}
        {compareModalType === 'changed' && !isChanged && (
          <>
            <div className={cx('button-container')}>
              <button
                onClick={subjectSelected}
                className={cx('button-product', isSelected ? 'selected' : '')}
              >
                {subjectProduct}
              </button>
              <button
                onClick={objectSelected}
                className={cx('button-product', isSelected ? 'selected' : '')}
              >
                {objectProduct}
              </button>
            </div>
            <button
              disabled={!isSubjectSelected && !isObjectSelected}
              onClick={handleChange}
              className={cx('button')}
            >
              교체하기
            </button>
          </>
        )}
        {isChanged && (
          <Link href={'/compare'}>
            <button className={cx('button')}>바로가기</button>
          </Link>
        )}
      </div>
    )
  );
}
