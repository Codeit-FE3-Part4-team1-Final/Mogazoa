import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  height: string;
  category: 'primary' | 'secondary' | 'tertiary';
}

export default function Button({
  children,
  width = '100%',
  height,
  category,
  ...rest
}: Props) {
  const buttonClass = `${styles.button} ${styles[category]}`;

  return (
    <button className={buttonClass} style={{ width, height }} {...rest}>
      {children}
    </button>
  );
}
