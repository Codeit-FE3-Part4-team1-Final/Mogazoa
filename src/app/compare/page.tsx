'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import classNames from 'classnames/bind';
import Table from '@/components/Table';
import styles from './ComparePage.module.scss';
import SubjectInput from '@/components/Input/CompareInput/SubjectInput';
import ObjectInput from '@/components/Input/CompareInput/ObjectInput';
import CompareLoading from '@/components/Loading/CompareLoading';
import TopScroll from '@/components/Button/TopScroll';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

export default function ComparePage() {
  const [subjectProduct, setSubjectProduct] = useState<any>();
  const [objectProduct, setObjectProduct] = useState<any>();
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleSubject = (data: string) => {
    setSubjectProduct(data);
  };

  const handleObject = (data: string) => {
    setObjectProduct(data);
  };

  const handleShow = () => setIsShow(true);

  const handleClose = () => setIsShow(false);

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('input-container')}>
          <SubjectInput
            handleUpdate={handleSubject}
            handleClose={handleClose}
          />
          <ObjectInput handleUpdate={handleObject} handleClose={handleClose} />
          <button
            className={cx('button')}
            disabled={!(subjectProduct && objectProduct)}
            onClick={handleShow}
          >
            비교하기
          </button>
        </div>
        {isShow ? (
          <Table
            SubjectProduct={subjectProduct}
            ObjectProduct={objectProduct}
          />
        ) : (
          <div className={cx('loading-container')}>
            <CompareLoading />
          </div>
        )}
        <TopScroll />
      </div>
      <Footer />
    </>
  );
}
