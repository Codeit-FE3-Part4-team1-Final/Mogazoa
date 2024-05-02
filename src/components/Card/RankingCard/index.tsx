import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './RankingCard.module.scss';
import { UserRanking } from '@/types/types';
import RankingChip from '@/components/Chip/RankingChip';

interface Props {
  userRanking: UserRanking;
  rankingIndex: number;
}

export default function RankingCard({ userRanking, rankingIndex }: Props) {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('ranking-Wrapper')}>
      <Link href={`/user/${userRanking.id}`}>
        <Image
          className={cx('ranking-image')}
          src={userRanking.image || '/images/profile-image.png'}
          alt='profile-image'
          width={45}
          height={45}
        />
      </Link>
      <div className={cx('ranking-container')}>
        <div className={cx('ranking-Info')}>
          <RankingChip ranking={rankingIndex} />
          <Link
            className={cx('ranking-nickname')}
            href={`/user/${userRanking.id}`}
          >
            {userRanking.nickname}
          </Link>
        </div>
        <div className={cx('ranking-userInfo')}>
          <div className={cx('ranking-user-followers')}>
            팔로워 {userRanking.followersCount}
          </div>
          <div className={cx('ranking-user-review')}>
            리뷰 {userRanking.reviewCount}
          </div>
        </div>
      </div>
    </div>
  );
}
