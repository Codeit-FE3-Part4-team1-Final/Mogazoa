import Image from 'next/image';
import { useState } from 'react';
import cx from '@/components/Production/cx.ts';
import CategoryChip from '@/components/Chip/CategoryChip';
import Button from '@/components/Button';
import { ProductDetailType } from '@/types/types.ts';
import CompareModal from '../Modal/CompareModal';
import ModalWrapper from '../Modal/ModalWrapper';

interface Props {
  productData: ProductDetailType;
}

type CompareModalType = 'subject' | 'object' | 'exist' | 'changed';

export default function Production({ productData }: Readonly<Props>) {
  const { id, image, name, description } = productData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CompareModalType | null>(null);

  const handleClick = () => {
    const subjectProductId = localStorage.getItem('subjectProductId');
    const objectProductId = localStorage.getItem('objectProductId');

    if (String(id) === subjectProductId || String(id) === objectProductId) {
      setModalType('exist');
    } else if (!subjectProductId) {
      setModalType('subject');
      localStorage.setItem('subjectProductId', String(id));
      localStorage.setItem('subjectProduct', name);
    } else if (!objectProductId) {
      setModalType('object');
      localStorage.setItem('obejctProductId', String(id));
      localStorage.setItem('objectProduct', name);
    } else {
      setModalType('changed');
    }
    setIsOpen(true);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('image-wrap', 'col-sm-4', 'col-md-4', 'col-lg-4')}>
        <Image src={image} alt={'상품이미지'} fill />
      </div>

      <div className={cx('content-wrap', 'col-sm-4', 'col-md-8', 'col-lg-8')}>
        <div className={cx('category-wrap')}>
          <CategoryChip productCategory={'전자기기'} size={'large'} />
        </div>
        <div className={cx('name-wrap')}>
          <div className={cx('name')}>
            <span className={cx('title__name')}>{name}</span>
            <Image
              src={'/images/unsave-icon.svg'}
              alt={'찜하기'}
              width={28}
              height={28}
            />
          </div>
          <div className={cx('name__action')}>
            <button className={cx('btn')}>
              <Image src={'/images/kakao-icon.svg'} alt={'카카오아이콘'} fill />
            </button>
            <button className={cx('btn')}>
              <Image src={'/images/share-icon.svg'} alt={'카카오아이콘'} fill />
            </button>
          </div>
        </div>
        <div className={cx('info-wrap')}>
          <span className={cx('description')}>{description}</span>
        </div>

        <div className={cx('production-footer')}>
          <div className={cx('button-1')}>
            <Button category={'primary'}>리뷰 작성하기</Button>
          </div>
          <div className={cx('button-2')}>
            <Button category={'secondary'} onClick={handleClick}>
              비교하기
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalWrapper>
          <CompareModal
            product={name}
            productId={id}
            compareModalType={modalType as CompareModalType}
            handleOpen={setIsOpen}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
