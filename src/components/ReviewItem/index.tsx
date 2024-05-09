import Image from 'next/image';
import cx from '@/components/ReviewItem/cx.ts';
import Rating from '@/components/Rating';
import Thumbs from '@/components/Thumbs';
import { Review, UserDetail } from '@/types/types.ts';

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
        <div className={cx('review-content')}>{review.content}</div>
        <div className={cx('review-images')}>
          {review.reviewImages.map((image) => (
            <div key={image.id} className={cx('review-image')}>
              <Image src={image.source} alt={'Review Image'} fill />
            </div>
          ))}
        </div>
        <div className={cx('review-footer')}>
          <div className={cx('date-wrapper')}>
            <span className={cx('review-date')}>
              {review.createdAt.slice(0, 10)}
            </span>

            {me?.id === review.user.id && (
              <div className={cx('action-links')}>
                <button onClick={() => handleToggleModal(review)}>수정</button>
                <button>삭제</button>
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
