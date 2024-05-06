import { useQuery } from '@tanstack/react-query';
import cx from '@/components/ProductionReview/cx.ts';
import {
  getReview,
  fetchUserInfo,
} from '@/components/ProductionReview/actions.ts';
import ReviewItem from '@/components/ReviewItem';
import { Review } from '@/types/types.ts';

interface Props {
  productId: string;
  order: string;
}
export default function ProductionReview({
  productId,
  order,
}: Readonly<Props>) {
  const { data: reviewData } = useQuery({
    queryKey: ['reviews', productId, order],
    queryFn: () => getReview(productId, order),
  });

  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: () => fetchUserInfo(),
  });

  console.log(reviewData);

  return (
    <div className={cx('container')}>
      {reviewData?.list.map((review: Review) => (
        <ReviewItem
          key={review.id}
          reviewId={review.id}
          user={review.user}
          reviewImages={review.reviewImages}
          content={review.content}
          isLiked={review.isLiked}
          likeCount={review.likeCount}
          rating={review.rating}
          loginId={me?.id}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
}
