import Image from 'next/image';
import cx from '@/components/ProductionReview/cx.ts';
import Thumbs from '@/components/Thumbs';
import Rating from '@/components/Rating';

export default function ProductionReview() {
  return (
    <div className={cx('container')}>
      <div className={cx('profile')}>
        <div className={cx('profile-image')}>
          <Image
            src={'/images/my-profile-icon.svg'}
            alt={'프로필이미지'}
            width={42}
            height={42}
          />
        </div>

        <div className={cx('profile-content')}>
          <div className={cx('nick-name')}>surisuri 마수리</div>
          <Rating Rating={4} />
        </div>
      </div>
      <div className={cx('review')}>
        <div className={cx('review-content')}>
          음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고,
          설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐
          우퍼 느낌도 있어요
        </div>
        <div className={cx('review-images')}>
          <div className={cx('review-image')}>
            <Image
              src={
                'https://image.msscdn.net/images/goods_img/20230223/3104558/3104558_16772321050475_500.jpg'
              }
              alt={'헤드셋'}
              fill
            />
          </div>
          <div className={cx('review-image')}>
            <Image
              src={
                'https://image.msscdn.net/images/goods_img/20230223/3104558/3104558_16772321050475_500.jpg'
              }
              alt={'헤드셋'}
              fill
            />
          </div>
        </div>
        <div className={cx('review-footer')}>
          <div className={cx('review-date')}>2024-01-29</div>
          <Thumbs likeCount={132} isLiked={true} reviewId={'1'} />
        </div>
      </div>
    </div>
  );
}
