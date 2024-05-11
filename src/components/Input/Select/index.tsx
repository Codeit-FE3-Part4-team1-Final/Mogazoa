import Image from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import SelectOptions from '../SelectOptions';
import { Category } from '@/types/types';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  handleChange: (id: number) => void;
  optionList: Category[];
  register?: UseFormRegisterReturn;
  error?: boolean;
  productCategory?: Category;
}

export default function Select({
  value,
  optionList,
  register,
  handleChange,
  error,
  productCategory,
  ...rest
}: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState(
    () => productCategory?.name || '카테고리를 선택해주세요',
  );

  const onClick = () => {
    setIsOpened((prev) => !prev);
  };
  const selectCategory = (category: string) => {
    setName(category);
  };
  return (
    <div className={cx('wrapper')} onClick={onClick}>
      <button
        className={cx(
          'select-button',
          error && 'error',
          name === '카테고리를 선택해주세요' && 'default',
        )}
        type='button'
      >
        {name}
        <Image
          src={'/images/dropdown-nonfocus.svg'}
          alt='dropdown-arrow'
          width={24}
          height={24}
          className={cx('arrow', isOpened && 'opened')}
        />
        {isOpened && (
          <SelectOptions
            optionList={optionList}
            handleChange={handleChange}
            selectCategory={selectCategory}
          />
        )}
      </button>
      <input
        value={value}
        readOnly
        className={cx('selected-input')}
        id='select'
        {...register}
        {...rest}
        type='number'
      />
    </div>
  );
}
