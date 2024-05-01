import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Button from '@/components/Button';
import TextFieldInput from '@/components/Input/TextFieldInput';
import ImageInput from '@/components/Input/ImageInput';
import TextBoxInput from '@/components/Input/TextBoxInput';

const cx = classNames.bind(styles);

export default function CreateProduct() {
  return (
    <div className={cx('wrapper')}>
      <span className={cx('title')}>상품 추가</span>
      <form className={cx('form')}>
        <div className={cx('input-container')}>
          <ImageInput image={null} />
          <div className={cx('box')}>
            <TextFieldInput
              value=''
              placeholder='상품명(상품 등록 여부를 확인해 주세요)'
            />
            <TextFieldInput value='' placeholder='카테고리 선택' />
          </div>
        </div>
        <TextBoxInput value='' placeholder='상품 설명을 작성해주세요.' />
      </form>
      <Button category='primary'>추가하기</Button>
    </div>
  );
}
