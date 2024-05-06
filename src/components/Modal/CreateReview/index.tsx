import { useState } from 'react';
import Button from '@/components/Button';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import CategoryChip from '@/components/Chip/CategoryChip';
import ReviewRating from '@/components/ReviewRating';
import useCreateReview from '@/hooks/useCreateReview.ts';
import cx from './cx.ts';
import { ProductCategory } from '@/types/types.ts';

export default function CreateReview({
  name,
  productCategory,
  productId,
}: {
  name: string;
  productCategory: ProductCategory;
  productId: number;
}) {
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
  } = useCreateReview(productId);
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleStarClick = (index: number): void => {
    const clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i += 1) {
      clickStates[i] = i <= index;
    }
    setClicked(clickStates);
    setValue('rating', index + 1);
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
            register={register('images', {
              onChange: onChangeFile,
            })}
            resetFile={resetFile}
            error={!!errors.images}
          />
        </div>

        <Button category='primary' type='submit' disabled={isPending}>
          추가하기
        </Button>
      </form>
    </div>
  );
}
