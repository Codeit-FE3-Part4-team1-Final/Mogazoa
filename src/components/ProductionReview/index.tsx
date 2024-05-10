import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import cx from '@/components/ProductionReview/cx.ts';
import getReview from '@/components/ProductionReview/actions.ts';
import ReviewItem from '@/components/ReviewItem';
import { ProductDetailType, Review, UserDetail } from '@/types/types.ts';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { useModalStore } from '../../../providers/ModalStoreProvider.tsx';
import EditReview from '@/components/Modal/EditReview';

interface Props {
  productData: ProductDetailType;
  order: string;
  me: UserDetail;
}
export default function ProductionReview({
  productData,
  order,
  me,
}: Readonly<Props>) {
  const { id: productId, name, category } = productData;
  const { data: reviewData } = useQuery({
    queryKey: ['reviews', productId, order],
    queryFn: () => getReview(productId, order),
  });
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const { isOpened, toggleModal, modalType, setModalType } = useModalStore(
    (state) => state,
  );

  const handleToggleModal = (review: Review) => {
    setCurrentReview(review);
    setModalType('editReview');
    toggleModal();
  };

  if (!reviewData || reviewData.list.length === 0) {
    return (
      <div className={cx('container')}>
        <p>등록된 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className={cx('container')}>
        {reviewData?.list.map((review: Review) => (
          <ReviewItem
            key={review.id}
            review={review}
            handleToggleModal={handleToggleModal}
            me={me}
          />
        ))}
      </div>

      {isOpened && modalType === 'editReview' && currentReview ? (
        <ModalWrapper>
          <EditReview
            name={name}
            productCategory={category.name}
            productId={productId}
            review={currentReview}
          />
        </ModalWrapper>
      ) : null}
    </>
  );
}
