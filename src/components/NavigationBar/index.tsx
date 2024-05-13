'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './NavigationBar.module.scss';
import useSidebarStore from '@/stores/sidebarStore';
import useSearchInputStore from '@/stores/searchValueStore';
import useSelectedCategoryStore from '@/stores/categoryStore';
import SearchDropDown from '../DropDown/SearchDropDown';

const menuItems = [
  { key: 'all', label: '전체' },
  { key: 'music', label: '음악' },
  { key: 'movie/drama', label: '영화/드라마' },
  { key: 'book', label: '강의/책' },
  { key: 'hotel', label: '호텔' },
  { key: 'interior', label: '가구/인테리어' },
  { key: 'restaurant', label: '식당' },
  { key: 'electronics', label: '전자기기' },
  { key: 'cosmetic', label: '화장품' },
  { key: 'cloth', label: '의류/잡화' },
  { key: 'app', label: '앱' },
];

interface Props {
  isLoggedIn: boolean;
}

const cx = classNames.bind(styles);

// Todo(송상훈)
export default function NavigationBar({ isLoggedIn }: Props) {
  const pathname = usePathname();
  const home = pathname === '/';

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const [searchSelectedCategory, setSearchSelectedCategory] =
    useState<string>('all');
  const { toggleSidebar } = useSidebarStore();
  const setSelectedCategory = useSelectedCategoryStore(
    (state) => state.setSelectedCategory,
  );
  const setInputValue = useSearchInputStore((state) => state.setInputValue);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputValue(event.currentTarget.value);
      setIsSearchVisible(false);
    }
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
  };

  const handleCategoryChange = (category: string) => {
    setSearchSelectedCategory(category);
  };

  // Todo(송상훈):
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
          <Link
            className={cx('logo-wrapper')}
            href='/'
            onClick={handleLogoClick}
          >
            <Image src='/images/logo-L.svg' alt='로고 이미지' priority fill />
          </Link>
        ) : null}

        {!home && isSearchVisible ? (
          <Link
            className={cx('logo-wrapper')}
            href='/'
            onClick={handleLogoClick}
          >
            <Image
              src='/images/logo-image.svg'
              alt='대체 로고 이미지'
              priority
              width={28}
              height={24}
            />
          </Link>
        ) : null}
        <div className={cx('navigation-item')}>
          <button
            className={cx('mobile-search-icon', {
              'search-icon-unVisible': isSearchVisible,
            })}
            onClick={toggleSearch}
          >
            <Image
              src='/images/search-icon.svg'
              alt='돋보기 이미지'
              width={24}
              height={24}
            />
          </button>
          <div
            className={cx('search', {
              'search-visible': isSearchVisible,
            })}
          >
            <div className={cx('search-dropDown')}>
              <SearchDropDown
                buttonLabel={searchSelectedCategory}
                dropItems={menuItems}
                onSelect={handleCategoryChange}
              />
            </div>
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
