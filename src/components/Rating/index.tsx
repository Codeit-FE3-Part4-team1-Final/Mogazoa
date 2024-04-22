import Image from 'next/image';
import cx from './cx.ts';

const filledStarImg = '/images/star-icon.svg';
const emptyStarImg = '/images/star-empty-icon.svg';
interface Props {
  Rating: number;
}

const Star = ({ filled }: { filled: boolean }) => {
  return (
    <Image
      src={filled ? filledStarImg : emptyStarImg}
      alt='별'
      width={18}
      height={18}
    />
  );
};

export default function Rating({ Rating: value }: Readonly<Props>) {
  const totalStars = 5;
  const stars = [];

  // 채워진 별을 렌더링합니다.
  for (let i = 0; i < value; i += 1) {
    stars.push(<Star key={`filled-${i}`} filled={true} />);
  }

  // 남은 별은 비워진 별로 렌더링합니다.
  for (let i = value; i < totalStars; i += 1) {
    stars.push(<Star key={`empty-${i}`} filled={false} />);
  }

  return <div className={cx('container')}>{stars}</div>;
}
