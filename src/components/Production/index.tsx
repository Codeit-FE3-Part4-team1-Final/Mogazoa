import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from '@/components/Production/cx.ts';
import CategoryChip from '@/components/Chip/CategoryChip';
import Button from '@/components/Button';
import { ModalType, ProductDetailType, UserDetail } from '@/types/types.ts';
import CompareModal from '../Modal/CompareModal';
import toggleFavorite from './actions.ts';
import copyCurrentUrl from '@/utils/copyCurrentUrl.ts';
import { useModalStore } from '../../../providers/ModalStoreProvider.tsx';
import ModalWrapper from '../Modal/ModalWrapper/index.tsx';
import CreateProduct from '../Modal/CreateProduct/index.tsx';
import getUserToken from '@/utils/getUserToken.ts';

interface Props {
  productData: ProductDetailType;
  me: UserDetail;
}

type CompareModalType = 'subject' | 'object' | 'exist' | 'changed';

export default function Production({ productData, me }: Readonly<Props>) {
  const [userToken, setUserToken] = useState<string | undefined>('');
  const { id, image, name, description, isFavorite, category, writerId } =
    productData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CompareModalType | null>(null);
  const {
    isOpened: isGlobalModalOpened,
    toggleModal: toggleGlobalModal,
    modalType: globalModalType,
    setModalType: setGlobalModalType,
  } = useModalStore((state) => state);
  const queryClient = useQueryClient();

  // 상품 편집 모달
  const handleToggleGlobalModal = async (type: ModalType) => {
    setGlobalModalType(type);

    toggleGlobalModal();
  };

  const { mutate } = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productData', id.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-favorite-products'],
      });
    },
    onError: (error: Error) => {
      console.error('Error toggling favorite:', error.message);
    },
  });

  const handleToggleFavorite = () => {
    mutate({ productId: id, isFavorite });
  };
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
      localStorage.setItem('objectProductId', String(id));
      localStorage.setItem('objectProduct', name);
    } else {
      setModalType('changed');
    }
    setIsOpen(true);
  };

  const isMe = writerId === me?.id;

  // 쿠키에서 토큰 가져오기
  useEffect(() => {
    const getToken = async () => {
      const token = await getUserToken();
      setUserToken(token?.value);
    };
    getToken();
  }, []);

  return (
    <div className={cx('container')}>
      {isGlobalModalOpened && globalModalType === 'editProduct' && (
        <ModalWrapper>
          <CreateProduct token={userToken!} productData={productData} />
        </ModalWrapper>
      )}
      <div className={cx('image-wrap', 'col-sm-4', 'col-md-4', 'col-lg-4')}>
        <Image src={image} alt={'상품이미지'} fill />
      </div>

      <div className={cx('content-wrap', 'col-sm-4', 'col-md-8', 'col-lg-8')}>
        <div className={cx('category-wrap')}>
          <CategoryChip productCategory={category.name} size={'large'} />
        </div>
        <div className={cx('name-wrap')}>
          <div className={cx('name')}>
            <span className={cx('title__name')}>{name}</span>
            <button onClick={handleToggleFavorite}>
              <Image
                src={
                  isFavorite
                    ? '/images/save-icon.svg'
                    : '/images/unsave-icon.svg'
                }
                alt={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                width={28}
                height={28}
              />
            </button>
          </div>
          <div className={cx('name__action')}>
            <button className={cx('btn')}>
              <Image src={'/images/kakao-icon.svg'} alt={'카카오아이콘'} fill />
            </button>
            <button className={cx('btn')} onClick={copyCurrentUrl}>
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

          {isMe && (
            <div className={cx('button-3')}>
              <Button
                category={'tertiary'}
                onClick={() => handleToggleGlobalModal('editProduct')}
              >
                편집하기
              </Button>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <CompareModal
          product={name}
          productId={id}
          compareModalType={modalType as CompareModalType}
          handleOpen={setIsOpen}
        />
      )}
    </div>
  );
}
