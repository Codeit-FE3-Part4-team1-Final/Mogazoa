import Image from 'next/image';
import styles from './index.module.scss';

export default function NavigationBar() {
  return (
    <div className={styles.container}>
      <Image src='/images/logo.svg' alt='로고 이미지' width={166} height={28} />
      <div className={styles['navigation-item']}>
        <div className={styles.search}>
          <Image
            src='/images/search-icon.svg'
            alt='돋보기 이미지'
            width={24}
            height={24}
          />
          <input placeholder='상품 이름을 검색해 보세요' />
        </div>
        <div className={styles['navigation-user-menu']}>
          <p>로그인</p>
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
}
