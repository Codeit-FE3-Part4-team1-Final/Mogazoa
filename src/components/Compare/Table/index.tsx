/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Result from './Result';
import TableCompare from './TableCompare';

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
      <div>
        <Result count={count} victoryProduct={victoryProduct} />
        <span>3가지 항목 중 {count}가지 항목에서 우세합니다.</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>기준</th>
            <th>상품 1</th>
            <th>상품 2</th>
            <th>결과</th>
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
