import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

interface ToastInterface {
  message: string | undefined;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toast({ message, setOpen }: ToastInterface) {
  useEffect(() => {
    const duration = setTimeout(() => {
      if (setOpen) {
        setOpen(false);
      }
    }, 2500);
    return () => {
      clearTimeout(duration);
    };
  }, [setOpen]);

  return <div className={cx('container')}>{message}</div>;
}
