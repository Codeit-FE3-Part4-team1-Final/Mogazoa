import Image from 'next/image';
import styles from './index.module.scss';

// Todo(송상훈) : UI만 그려놓음, 로그인 기능 후 로직 완성 예정
export default function NavigationBar() {
  return (
    <div className={styles.container}>
      <div className={styles['menu-icon']}>
        <Image
          src='/images/menu-icon.svg'
          alt='메뉴 이미지'
          width={24}
          height={24}
        />
      </div>
      <div className={styles['logo-wrapper']}>
        <Image src='/images/logo-L.svg' alt='로고 이미지' fill />
      </div>
      <div className={styles['navigation-item']}>
        <div className={styles.search}>
          <Image
            src='/images/search-icon.svg'
            alt='돋보기 이미지'
            width={24}
            height={24}
          />
          <input
            className={styles[`search-input`]}
            placeholder='상품 이름을 검색해 보세요'
          />
        </div>
        <div className={styles['navigation-user-menu']}>
          <p>로그인</p>
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
}
