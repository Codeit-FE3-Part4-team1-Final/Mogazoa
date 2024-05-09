import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from '@/components/ReviewItem/cx.ts';
import Rating from '@/components/Rating';
import Thumbs from '@/components/Thumbs';
import { Review, UserDetail } from '@/types/types.ts';
import deleteReviewFunction from '@/utils/deleteReview.ts';

interface ReviewItemProps {
  review: Review;
  handleToggleModal: (review: Review) => void;
  me: UserDetail;
}

export default function ReviewItem({
  review,
  handleToggleModal,
  me,
}: Readonly<ReviewItemProps>) {
  const defaultProfileImageUrl = '/images/profile-image.png';

  const queryClient = useQueryClient();
  const deleteReviewMutation = useMutation({
    mutationFn: deleteReviewFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },

    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
    },
  });

  const handleDeleteReview = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId);
  };
  return (
    <div className={cx('container')}>
      <div className={cx('profile')}>
        <div className={cx('profile-image')}>
          <Image
            src={review.user.image ?? defaultProfileImageUrl}
            alt={'프로필이미지'}
            width={42}
            height={42}
          />
        </div>

        <div className={cx('profile-content')}>
          <div className={cx('nick-name')}>{review.user.nickname}</div>
          <Rating Rating={review.rating} />
        </div>
      </div>

      <div className={cx('review')}>
        <div className={cx('review-content')}>
          {review.reviewImages.length === 0 ? null : (
            <div className={cx('review-images')}>
              {review.reviewImages.map((image) => (
                <div key={image.id} className={cx('review-image')}>
                  <Image src={image.source} alt={'Review Image'} fill />
                </div>
              ))}
            </div>
          )}
          <div className={cx('review-text')}>{review.content}</div>
        </div>
        <div className={cx('review-footer')}>
          <div className={cx('date-wrapper')}>
            <span className={cx('review-date')}>
              {review.createdAt.slice(0, 10)}
            </span>

            {me?.id === review.user.id && (
              <div className={cx('action-links')}>
                <button onClick={() => handleToggleModal(review)}>수정</button>
                <button onClick={() => handleDeleteReview(review.id)}>
                  삭제
                </button>
              </div>
            )}
          </div>
          <Thumbs
            likeCount={review.likeCount}
            isLiked={review.isLiked}
            reviewId={review.id}
          />
        </div>
      </div>
    </div>
  );
}
