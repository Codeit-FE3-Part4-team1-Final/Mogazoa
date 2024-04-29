import { ChangeEvent, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './TextFieldInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export default function TextFieldInput({
  value,
  onChange,
  onBlur,
  ...rest
}: Props) {
  return (
    <input
      className={cx('input')}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      {...rest}
    />
  );
}
