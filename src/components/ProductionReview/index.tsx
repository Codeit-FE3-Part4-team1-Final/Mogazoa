import { useQuery } from '@tanstack/react-query';
import cx from '@/components/ProductionReview/cx.ts';
import { getReview } from '@/components/ProductionReview/actions.ts';
import ReviewItem from '@/components/ReviewItem';
import { Review, UserDetail } from '@/types/types.ts';

interface Props {
  productId: string;
  order: string;
  me: UserDetail;
}
export default function ProductionReview({
  productId,
  order,
  me,
}: Readonly<Props>) {
  const { data: reviewData } = useQuery({
    queryKey: ['reviews', productId, order],
    queryFn: () => getReview(productId, order),
  });

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
