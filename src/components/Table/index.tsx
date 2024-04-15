'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import Result from './Result';
import TableCompare from './TableCompare';

const cx = classNames.bind(styles);
interface TableInterface {
  SubjectProduct: any;
  ObjectProduct: any;
}

export default function Table({
  SubjectProduct,
  ObjectProduct,
}: TableInterface) {
  const [count, setCount] = useState(0);
  const [victoryProduct, setVictoryProduct] = useState('');
  const handleCount = (value: number) => setCount(value);
  const showVictoryProduct = (value: string) => setVictoryProduct(value);

  return (
    <>
      <div className={cx('container')}>
        <Result count={count} victoryProduct={victoryProduct} />
        <span className={cx('description')}>
          3가지 항목 중 {count}가지 항목에서 우세합니다.
        </span>
      </div>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th className={cx('table-head')}>기준</th>
            <th className={cx('table-head')}>상품 1</th>
            <th className={cx('table-head')}>상품 2</th>
            <th className={cx('table-head')}>결과</th>
          </tr>
        </thead>
        <TableCompare
          handleCount={handleCount}
          showVictoryProduct={showVictoryProduct}
          SubjectProduct={SubjectProduct}
          ObjectProduct={ObjectProduct}
        />
      </table>
    </>
  );
}
