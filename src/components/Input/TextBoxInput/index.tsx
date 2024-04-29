import classNames from 'classnames/bind';
import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styles from './TextBoxInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

export default function TextBoxInput({
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength = 300,
  ...rest
}: Props) {
  return (
    <label className={cx('wrapper')} htmlFor='text-area'>
      <textarea
        value={value}
        className={cx('text-area')}
        id='text-area'
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        {...rest}
      />
      <p className={cx('text-count')}>
        {value.length}/{maxLength}
      </p>
    </label>
  );
}
