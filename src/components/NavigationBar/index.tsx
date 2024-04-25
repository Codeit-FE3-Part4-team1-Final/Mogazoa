import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from 'next/image';
import styles from './NavigationBar.module.scss';

// Todo(송상훈)
export default function NavigationBar() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const isLoggedIn = !!accessToken;

  return (
    <div className={styles.wrapper}>
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
            {isLoggedIn ? (
              <>
                <Link href='/compare'>
                  <button className={styles.button}>비교하기</button>
                </Link>
                <Link href='/mypage'>
                  <button className={styles.button}>내프로필</button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/signin'>
                  <button className={styles.button}>로그인</button>
                </Link>
                <Link href='/signup'>
                  <button className={styles.button}>회원가입</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
