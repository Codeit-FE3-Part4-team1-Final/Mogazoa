import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import useCreateProduct from '@/hooks/useCreateProduct';

const cx = classNames.bind(styles);

export default function CreateProduct() {
  const {
    name,
    description,
    previewImage,
    onChangeFile,
    resetFile,
    onChangeName,
    onChangeCategory,
    onChangeDescription,
    onSubmit,
    register,
    handleSubmit,
    onBlurName,
    onBlurDescription,
    errors,
  } = useCreateProduct();

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>상품 추가</span>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('input-container')}>
          <ImageInput
            image={previewImage}
            register={register('image', {
              required: '대표 이미지를 추가해주세요.',
              onChange: onChangeFile,
            })}
            resetFile={resetFile}
            error={!!errors.image}
          />
          <div className={cx('box')}>
            <TextFieldInput
              value={name}
              placeholder={
                errors.name
                  ? errors.name.message
                  : '상품명(상품 등록 여부를 확인해 주세요)'
              }
              onChange={onChangeName}
              register={register('name', {
                required: '상품 이름은 필수 입력입니다.',
                onBlur: onBlurName,
              })}
              error={!!errors.name}
            />
            <TextFieldInput
              value={'영화/음악'}
              placeholder='카테고리 선택'
              onChange={onChangeCategory}
              register={register('categoryId')}
            />
          </div>
        </div>
        <TextBoxInput
          value={description}
          placeholder='상품 설명을 작성해주세요.'
          onChange={onChangeDescription}
          maxLength={500}
          register={register('description', {
            required: '상품 설명은 필수 입력입니다.',
            onBlur: onBlurDescription,
          })}
          error={!!errors.description}
        />
        <Button category='primary' type='submit'>
          추가하기
        </Button>
      </form>
    </div>
  );
}
