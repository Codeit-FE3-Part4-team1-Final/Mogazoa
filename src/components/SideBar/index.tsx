import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import getCategories from '@/apis/getCategories';
import { Category } from '@/types/types';

interface Props {
  setSelectedCategory: (category: Category | null) => void;
}

// todo(송상훈) : 에러처리 로딩처리 추가할것
export default function SideBar({ setSelectedCategory }: Props) {
  const cx = classNames.bind(styles);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const categories = getCategories();

  return (
    <div className={cx('sideBar-container')}>
      <h3 className={cx('sideBar-header')}>카테고리</h3>
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
            }}
          >
            {category.name}
          </button>
        ))}
      </ul>
    </div>
  );
}
