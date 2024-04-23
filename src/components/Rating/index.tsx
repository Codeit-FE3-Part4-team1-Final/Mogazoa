import Image from 'next/image';
import cx from './cx.ts';

const FILL_STAR_IMG = '/images/star-icon.svg';
const EMPTY_STAR_IMG = '/images/star-empty-icon.svg';
const TOTAL_STARS = 5;

interface Props {
  Rating: number;
}

const Star = ({ filled }: { filled: boolean }) => {
  return (
    <Image
      src={filled ? FILL_STAR_IMG : EMPTY_STAR_IMG}
      alt='별'
      width={18}
      height={18}
    />
  );
};

export default function Rating({ Rating: value }: Readonly<Props>) {
  const stars = [];

  for (let i = 0; i < value; i += 1) {
    stars.push(<Star key={`filled-${i}`} filled={true} />);
  }

  for (let i = value; i < TOTAL_STARS; i += 1) {
    stars.push(<Star key={`empty-${i}`} filled={false} />);
  }

  return <div className={cx('container')}>{stars}</div>;
}
