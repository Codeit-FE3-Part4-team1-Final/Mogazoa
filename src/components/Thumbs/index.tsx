import { useState } from 'react';
import Image from 'next/image';
import cx from '@/components/Thumbs/cx.ts';

interface Props {
  likeCount: number;
  isLiked: boolean;
  reviewId: string;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function Thumbs({
  likeCount,
  isLiked,
  reviewId,
}: Readonly<Props>) {
  const [isLike, setIsLike] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

  const handleLikeUnlike = async () => {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}/like`, {
      method: isLike ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      setIsLike(result.isliked);
      setCount(result.likeCount);
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
