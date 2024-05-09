import { useState } from 'react';
import Image from 'next/image';
import cx from '@/components/Thumbs/cx.ts';
import toggleLike from '@/components/Thumbs/action.ts';

interface Props {
  likeCount: number;
  isLiked: boolean;
  reviewId: number;
}
export default function Thumbs({
  likeCount,
  isLiked,
  reviewId,
}: Readonly<Props>) {
  const [isLike, setIsLike] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

  const handleLikeUnlike = async () => {
    try {
      const result = await toggleLike(reviewId, isLike);
      setIsLike(result.isLiked);
      setCount(result.likeCount);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const likeImage = isLike
    ? '/images/thumps-on-icon.svg'
    : '/images/thumps-off-icon.svg';

  return (
    <button
      title={'좋아요'}
      onClick={handleLikeUnlike}
      className={cx('likeButton')}
    >
      <div className={cx('like')}>
        <Image src={likeImage} alt={'좋아요'} fill />
      </div>
      <div className={cx('text', { liked: isLike })}>{count}</div>
    </button>
  );
}
