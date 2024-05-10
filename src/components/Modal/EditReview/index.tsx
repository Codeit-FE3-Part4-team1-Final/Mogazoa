import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import CategoryChip from '@/components/Chip/CategoryChip';
import ReviewRating from '@/components/ReviewRating';
import cx from './cx.ts';
import { ProductCategory, Review } from '@/types/types.ts';
import useEditReview from '@/hooks/useEditReview.ts';

export default function EditReview({
  name,
  productCategory,
  productId,
  review,
}: Readonly<{
  name: string;
  productCategory: ProductCategory;
  productId: number;
  review: Review;
}>) {
  const {
    content,
    previewImage,
    onChangeFile,
    resetFile,
    onChangeContent,
    onSubmit,
    register,
    handleSubmit,
    onBlurContent,
    errors,
    isPending,
    setValue,
  } = useEditReview(productId, review);

  const [clicked, setClicked] = useState<boolean[]>(Array(5).fill(false));

  useEffect(() => {
    const newClicked = Array(5)
      .fill(false)
      .map((_, index) => index < review.rating);
    setClicked(newClicked);
    setValue('rating', review.rating); // 별점 초기화

    if (review.reviewImages && review.reviewImages.length > 0) {
      setValue('images', review.reviewImages);
    }
  }, [review, setValue]);

  const handleStarClick = (index: number): void => {
    const newClicked = clicked.map((_, idx) => idx <= index);
    setClicked(newClicked);
    setValue('rating', index + 1); // 폼 상태 업데이트
  };

  return (
    <div className={cx('wrapper')}>
      <CategoryChip productCategory={productCategory} size={'large'} />
      <span className={cx('title')}>{name}</span>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
        <TextBoxInput
          value={content}
          placeholder='리뷰를 작성해 주세요.'
          onChange={onChangeContent}
          maxLength={100}
          register={register('content', {
            required: '리뷰를 작성해주세요.',
            onBlur: onBlurContent,
          })}
          error={!!errors.content}
        />
        <div className={cx('input-container')}>
          <ImageInput
            image={previewImage}
            onChange={onChangeFile}
            resetFile={resetFile}
            error={!!errors.images}
          />
        </div>

        <Button category='primary' type='submit' disabled={isPending}>
          수정하기
        </Button>
      </form>
    </div>
  );
}
