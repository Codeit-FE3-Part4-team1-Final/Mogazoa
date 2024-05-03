'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './NavigationBar.module.scss';
import useSidebarStore from '@/stores/sidebarStore';
import useSearchStore from '@/stores/searchStore';

const cx = classNames.bind(styles);

// Todo(송상훈)
export default function NavigationBar() {
  const pathname = usePathname();
  const isFixed = pathname === '/';

  const accessToken = localStorage.getItem('accessToken');

  const isLoggedIn = !!accessToken;

  const { toggleSidebar } = useSidebarStore();
  const { toggleSearch, isSearchVisible } = useSearchStore();

  return (
    <div className={cx('wrapper', { fixed: isFixed })}>
      <div className={cx('container')}>
        <button className={cx('menu-icon')} onClick={toggleSidebar}>
          <Image
            src='/images/menu-icon.svg'
            alt='메뉴 이미지'
            width={24}
            height={24}
          />
        </button>
        <Link
          className={cx('logo-wrapper', {
            'logo-unVisible': !!isSearchVisible,
          })}
          href='/'
        >
          <Image src='/images/logo-L.svg' alt='로고 이미지' fill />
        </Link>
        <div className={cx('navigation-item')}>
          <div
            className={cx('search', {
              'search-visible': isSearchVisible,
            })}
          >
            <button className={cx('search-icon')} onClick={toggleSearch}>
              <Image
                src='/images/search-icon.svg'
                alt='돋보기 이미지'
                width={24}
                height={24}
              />
            </button>
            <input
              className={cx('search-input')}
              placeholder='상품 이름을 검색해 보세요'
            />
          </div>
          <div className={cx('navigation-user-menu')}>
            {isLoggedIn ? (
              <>
                <Link href='/compare'>
                  <button className={cx('button')}>비교하기</button>
                </Link>
                <Link href='/mypage'>
                  <button className={cx('button')}>내프로필</button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/signin'>
                  <button className={cx('button')}>로그인</button>
                </Link>
                <Link href='/signup'>
                  <button className={cx('button')}>회원가입</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
