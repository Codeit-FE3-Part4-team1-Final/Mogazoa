import { AiFillStar } from 'react-icons/ai';
import cx from './cx.ts';

const ReviewRating = ({
  clicked,
  onStarClick,
}: {
  clicked: boolean[];
  onStarClick: (index: number) => void;
}) => {
  const starArray = [0, 1, 2, 3, 4];

  return (
    <div className={cx('stars')}>
      {starArray.map((el) => {
        return (
          <AiFillStar
            fontSize={40}
            key={el}
            id={`${el}`}
            onClick={() => onStarClick(el)}
            className={cx({ yellowStars: clicked[el] })}
          />
        );
      })}
    </div>
  );
};

export default ReviewRating;
