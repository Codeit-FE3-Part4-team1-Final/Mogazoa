'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './NavigationBar.module.scss';
import useSidebarStore from '@/stores/sidebarStore';
import useSearchInputStore from '@/stores/searchValueStore';

interface Props {
  isLoggedIn: boolean;
}

const cx = classNames.bind(styles);

// Todo(송상훈)
export default function NavigationBar({ isLoggedIn }: Props) {
  const pathname = usePathname();
  const home = pathname === '/';

  const { toggleSidebar } = useSidebarStore();
  const setInputValue = useSearchInputStore((state) => state.setInputValue);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputValue(event.currentTarget.value);
    }
  };

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  // Todo(송상훈):로고 이미지 랜더링 부분 리팩토링 하기
  return (
    <div className={cx('wrapper', { fixed: home })}>
      <div className={cx('container')}>
        <button
          className={cx('menu-icon', { menuVisible: !home })}
          onClick={toggleSidebar}
        >
          <Image
            src='/images/menu-icon.svg'
            alt='메뉴 이미지'
            width={24}
            height={24}
          />
        </button>
        {(home && !isSearchVisible) || (!home && !isSearchVisible) ? (
          <Link className={cx('logo-wrapper')} href='/'>
            <Image src='/images/logo-L.svg' alt='로고 이미지' fill />
          </Link>
        ) : null}

        {!home && isSearchVisible ? (
          <Link className={cx('logo-wrapper')} href='/'>
            <Image
              src='/images/logo-image.svg'
              alt='대체 로고 이미지'
              width={28}
              height={28}
            />
          </Link>
        ) : null}
        <div className={cx('navigation-item')}>
          <div
            className={cx('search', {
              'search-visible': isSearchVisible,
            })}
          >
            <button className={cx('mobile-search-icon')} onClick={toggleSearch}>
              <Image
                src='/images/search-icon.svg'
                alt='돋보기 이미지'
                width={24}
                height={24}
              />
            </button>
            <button className={cx('search-icon')}>
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
              onKeyDown={handleKeyDown}
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
