'use client';

import classNames from 'classnames/bind';
import styles from './Floating.module.scss';
import { useModalStore } from '../../../providers/ModalStoreProvider';
import ModalWrapper from '../Modal/ModalWrapper';
import { ModalType } from '@/types/types';
import CreateProduct from '../Modal/CreateProduct';

const cx = classNames.bind(styles);

export default function Floating() {
  const { isOpened, toggleModal, modalType, setModalType } = useModalStore(
    (state) => state,
  );

  const handleToggleModal = (type: ModalType) => {
    setModalType(type);
    toggleModal();
  };

  return (
    <>
      {isOpened && modalType === 'createProduct' ? (
        <ModalWrapper>
          <CreateProduct />
        </ModalWrapper>
      ) : null}
      <div
        className={cx('wrapper')}
        onClick={() => handleToggleModal('createProduct')}
      >
        <svg
          width='60'
          height='60'
          viewBox='0 0 60 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='30' cy='30' r='30' fill='url(#paint0_linear_236_3488)' />
          <path
            d='M29.3246 30.6754H19.6754C19.4841 30.6754 19.3236 30.6105 19.1942 30.4808C19.0647 30.351 19 30.1902 19 29.9983C19 29.8065 19.0647 29.6462 19.1942 29.5175C19.3236 29.3889 19.4841 29.3246 19.6754 29.3246H29.3246V19.6754C29.3246 19.4841 29.3895 19.3236 29.5192 19.1942C29.649 19.0647 29.8098 19 30.0017 19C30.1935 19 30.3538 19.0647 30.4825 19.1942C30.6111 19.3236 30.6754 19.4841 30.6754 19.6754V29.3246H40.3246C40.5159 29.3246 40.6764 29.3895 40.8058 29.5192C40.9353 29.649 41 29.8098 41 30.0017C41 30.1935 40.9353 30.3538 40.8058 30.4825C40.6764 30.6111 40.5159 30.6754 40.3246 30.6754H30.6754V40.3246C30.6754 40.5159 30.6105 40.6764 30.4808 40.8058C30.351 40.9353 30.1902 41 29.9983 41C29.8065 41 29.6462 40.9353 29.5175 40.8058C29.3889 40.6764 29.3246 40.5159 29.3246 40.3246V30.6754Z'
            fill='#F1F1F5'
          />
          <defs>
            <linearGradient
              id='paint0_linear_236_3488'
              x1='0'
              y1='0'
              x2='61.199'
              y2='1.24896'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#5097FA' />
              <stop offset='1' stopColor='#5363FF' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
