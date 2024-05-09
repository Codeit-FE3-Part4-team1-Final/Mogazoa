import classNames from 'classnames/bind';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  category: 'primary' | 'secondary' | 'tertiary';
}

export default function Button({
  children,
  width = '100%',
  category,
  ...rest
}: Props) {
  return (
    <button className={cx('button', cx(category))} style={{ width }} {...rest}>
      {children}
    </button>
  );
}
