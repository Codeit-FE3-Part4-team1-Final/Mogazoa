import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './NoProduct.module.scss';
import { UserProductCategory } from '@/components/Profile/ProfileProductPanel';

const cx = classNames.bind(styles);

interface Props {
  userProductCategory: UserProductCategory;
}

export default function NoProduct({ userProductCategory }: Props) {
  const pathname = usePathname();
  const getMyPageText = () => {
    if (userProductCategory === 'created-products') {
      return '상품을 등록해보세요!';
    }
    if (userProductCategory === 'favorite-products') {
      return '마음에 드는 상품을 찜해보세요!';
    }
    if (userProductCategory === 'reviewed-products') {
      return '상품에 리뷰를 남겨보세요!';
    }
    return '상품이 없습니다';
  };
  const getUserPageText = () => {
    if (userProductCategory === 'created-products') {
      return '등록한 상품이 없습니다!';
    }
    if (userProductCategory === 'favorite-products') {
      return '찜한 상품이 없습니다!';
    }
    if (userProductCategory === 'reviewed-products') {
      return '리뷰 남긴 상품이 없습니다!';
    }
    return '상품이 없습니다';
  };

  return (
    <div className={cx('wrapper')}>
      {pathname === '/mypage' ? getMyPageText() : getUserPageText()}
    </div>
  );
}
