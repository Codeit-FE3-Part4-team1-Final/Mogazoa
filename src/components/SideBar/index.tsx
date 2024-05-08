import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import getCategories from '@/apis/getCategories';
import { Category } from '@/types/types';
import useSidebarStore from '@/stores/sidebarStore';

interface Props {
  setSelectedCategory: (category: Category | null) => void;
}

const cx = classNames.bind(styles);

// todo(송상훈) : 에러처리 로딩처리 추가할것
export default function SideBar({ setSelectedCategory }: Props) {
  // const isLoggedIn = !!localStorage.getItem('accessToken');
  const isLoggedIn = true;

  const { toggleSidebar } = useSidebarStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const categories = getCategories();

  return (
    <div className={cx('sideBar-wrapper')}>
      <div className={cx('sideBar-container')}>
        <button
          className={cx('sideBar-header')}
          onClick={() => {
            setSelectedCategory(null);
          }}
        >
          카테고리
        </button>
        <ul className={cx('sideBar-list-container')}>
          {categories?.map((category) => (
            <button
              className={cx('sideBar-list', {
                selected: selectedCategoryId === category.id,
              })}
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedCategoryId(category.id);
                toggleSidebar();
              }}
            >
              {category.name}
            </button>
          ))}
        </ul>
      </div>
      <div className={cx('user-menu')}>
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
  );
}
