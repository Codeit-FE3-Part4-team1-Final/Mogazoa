import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';
import useCreateProduct from '@/hooks/useCreateProduct';
import Select from '@/components/Input/Select';

const cx = classNames.bind(styles);

interface Props {
  token: string;
}

export default function CreateProduct({ token }: Props) {
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
    categoryList,
  } = useCreateProduct(token);

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
              placeholder='상품명(상품 등록 여부를 확인해 주세요)'
              onChange={onChangeName}
              register={register('name', {
                required: '상품 이름은 필수 입력입니다.',
                onBlur: onBlurName,
              })}
              error={!!errors.name}
            >
              <p className={cx('nickname-count')}>{name.length}/20</p>
            </TextFieldInput>
            <Select
              optionList={categoryList}
              handleChange={onChangeCategory}
              register={register('categoryId', {
                required: '카테고리를 선택해주세요.',
              })}
              error={!!errors.categoryId}
            />
          </div>
        </div>
        <TextBoxInput
          value={description}
          placeholder='상품 설명을 최소 10자 이상 작성해주세요.'
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
