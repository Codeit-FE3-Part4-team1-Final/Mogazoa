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
    category,
    description,
    onNameChange,
    onCategoryChange,
    onDescriptionChange,
  } = useCreateProduct();

  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>상품 추가</span>
      <form className={cx('form')}>
        <div className={cx('input-container')}>
          <ImageInput image={null} />
          <div className={cx('box')}>
            <TextFieldInput
              value={name}
              placeholder='상품명(상품 등록 여부를 확인해 주세요)'
              onChange={onNameChange}
            />
            <TextFieldInput
              value={category}
              placeholder='카테고리 선택'
              onChange={onCategoryChange}
            />
          </div>
        </div>
        <TextBoxInput
          value={description}
          placeholder='상품 설명을 작성해주세요.'
          onChange={onDescriptionChange}
          maxLength={500}
        />
      </form>
      <Button category='primary'>추가하기</Button>
    </div>
  );
}
