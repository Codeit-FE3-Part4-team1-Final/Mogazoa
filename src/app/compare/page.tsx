'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import classNames from 'classnames/bind';
import CompareInput from '@/components/Input/CompareInput';
import Table from '@/components/Table';
import styles from './ComparePage.module.scss';
import Button from '@/components/Button';

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
          <CompareInput
            isSubject={true}
            handleUpdate={handleSubject}
            handleClose={handleClose}
          />
          <CompareInput
            isSubject={false}
            handleUpdate={handleObject}
            handleClose={handleClose}
          />
          <Button
            disabled={!(subjectProduct && objectProduct)}
            width={'200px'}
            height={'56px'}
            category={'primary'}
            onClick={handleShow}
          >
            비교하기
          </Button>
        </div>
        {isShow && (
          <Table
            SubjectProduct={subjectProduct}
            ObjectProduct={objectProduct}
          />
        )}
      </div>
    </>
  );
}
