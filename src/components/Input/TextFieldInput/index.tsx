import { InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './TextFieldInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  value: string;
  register?: UseFormRegisterReturn;
  error?: boolean;
}

export default function TextFieldInput({
  children,
  value,
  register,
  error,
  ...rest
}: Props) {
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('input', error ? 'error' : '')}
        value={value}
        {...register}
        {...rest}
      />
      {children}
    </div>
  );
}
