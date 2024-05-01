import classNames from 'classnames/bind';
import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './TextBoxInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  value: string;
  maxLength?: number;
  register?: UseFormRegisterReturn;
}

export default function TextBoxInput({
  placeholder,
  value,
  maxLength = 300,
  register,
  ...rest
}: Props) {
  return (
    <label className={cx('wrapper')} htmlFor='text-area'>
      <textarea
        value={value}
        className={cx('text-area')}
        id='text-area'
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        {...rest}
      />
      <p className={cx('text-count')}>
        {value.length}/{maxLength}
      </p>
    </label>
  );
}
