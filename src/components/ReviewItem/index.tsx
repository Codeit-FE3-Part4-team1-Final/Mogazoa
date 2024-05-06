import Image from 'next/image';
import cx from '@/components/ReviewItem/cx.ts';
import Rating from '@/components/Rating';
import Thumbs from '@/components/Thumbs';

interface User {
  image: string | null;
  nickname: string;
  id: number;
}

interface ReviewImage {
  source: string;
  id: number;
}

interface ReviewItemProps {
  reviewId: number;
  user: User;
  reviewImages: ReviewImage[];
  content: string;
  isLiked: boolean;
  likeCount: number;
  rating: number;
  createdAt: string;
  loginId: number;
}

export default function ReviewItem({
  reviewId,
  user,
  reviewImages,
  content,
  isLiked,
  likeCount,
  rating,
  createdAt,
  loginId,
}: Readonly<ReviewItemProps>) {
  const defaultProfileImageUrl = '/images/profile-image.png';

  return (
    <div className={cx('container')}>
      <div className={cx('profile')}>
        <div className={cx('profile-image')}>
          <Image
            src={user.image || defaultProfileImageUrl}
            alt={'프로필이미지'}
            width={42}
            height={42}
          />
        </div>

        <div className={cx('profile-content')}>
          <div className={cx('nick-name')}>{user.nickname}</div>
          <Rating Rating={rating} />
        </div>
      </div>
      <div className={cx('review')}>
        <div className={cx('review-content')}>{content}</div>
        <div className={cx('review-images')}>
          {reviewImages.map((image) => (
            <div key={image.id} className={cx('review-image')}>
              <Image src={image.source} alt={'Review Image'} fill />
            </div>
          ))}
        </div>
        <div className={cx('review-footer')}>
          <div className={cx('date-wrapper')}>
            <span className={cx('review-date')}>{createdAt.slice(0, 10)}</span>

            {loginId === user.id && (
              <div className={cx('action-links')}>
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
          </div>

          <Thumbs likeCount={likeCount} isLiked={isLiked} reviewId={reviewId} />
        </div>
      </div>
    </div>
  );
}
