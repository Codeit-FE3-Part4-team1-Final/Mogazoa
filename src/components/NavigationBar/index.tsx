'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavigationBar.module.scss';
import useSidebarStore from '@/stores/sidebarStore';

// Todo(송상훈)
export default function NavigationBar() {
  const accessToken = localStorage.getItem('accessToken');

  const isLoggedIn = !!accessToken;

  const { toggleSidebar } = useSidebarStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles['menu-icon']} onClick={toggleSidebar}>
          <Image
            src='/images/menu-icon.svg'
            alt='메뉴 이미지'
            width={24}
            height={24}
          />
        </button>
        <Link className={styles['logo-wrapper']} href='/'>
          <Image src='/images/logo-L.svg' alt='로고 이미지' fill />
        </Link>
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
