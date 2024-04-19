'use client';

import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ModalWrapper.module.scss';
import { useModalStore } from '../../../../providers/ModalStoreProvider';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
}

export default function ModalWrapper({ children }: Props) {
  const { toggleModal } = useModalStore((state) => state);
  const handleWrapperModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };
  return (
    <div className={cx('wrapper')} onClick={handleWrapperModal}>
      <div className={cx('container')}>
        <Image
          src={'/images/close-icon.svg'}
          alt='close-icon'
          width={40}
          height={40}
          className={cx('close-icon')}
          onClick={toggleModal}
        />
        {children}
      </div>
    </div>
  );
}
