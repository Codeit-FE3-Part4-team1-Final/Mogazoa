'use client';

import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalWrapper.module.scss';
// import { useModalStore } from '../../../../providers/ModalStoreProvider';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
}

export default function ModalWrapper({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>{children}</div>
    </div>
  );
}
