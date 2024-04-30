import cx from '../cx.ts';

const generateComparisonText = (
  count: number,
  averageCount: number,
  unit: string,
) => {
  const difference = Math.abs(count - averageCount).toFixed(1);

  if (count === averageCount) {
    return '이 카테고리 내의 평균과 동일해요!';
  }
  if (count > averageCount) {
    return (
      <>
        같은 카테고리의 제품들보다{' '}
        <span className={cx('difference')}>
          {difference} {unit}
        </span>{' '}
        더 높아요!
      </>
    );
  }
  return (
    <>
      같은 카테고리의 제품들보다{' '}
      <span className={cx('difference')}>
        {difference} {unit}
      </span>{' '}
      낮아요.
    </>
  );
};

export default generateComparisonText;
