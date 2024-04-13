import { useState } from 'react';
import Image from 'next/image';
import cx from '@/components/LikeButton/cx.ts';

interface Props {
  likeCount: number;
  isLiked: boolean;
  reviewId: string;
}
export default function LikeButton({
  likeCount,
  isLiked,
  reviewId,
}: Readonly<Props>) {
  const [isLike, setIsLike] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

  const handleLikeUnlike = async () => {
    const response = await fetch(
      `https://mogazoa-api.vercel.app/3-1/reviews/${reviewId}/like`,
      {
        method: isLike ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      setIsLike(result.isliked);
      setCount(result.likeCount);
    }
  };

  const LikeImage = isLike
    ? '/images/thumps-on-icon.svg'
    : '/images/thumps-off-icon.svg';

  return (
    <button
      title={'좋아요'}
      onClick={handleLikeUnlike}
      className={cx('likeButton')}
    >
      <div className={cx('like')}>
        <Image src={LikeImage} alt={'좋아요'} fill />
      </div>
      <div className={cx('text', { liked: isLike })}>{count}</div>
    </button>
  );
}
