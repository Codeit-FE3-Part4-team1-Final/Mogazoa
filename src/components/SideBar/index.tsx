import classNames from 'classnames/bind';
import getCategories from '@/apis/getCategories';
import { Category } from '@/types/types';
import styles from './SideBar.module.scss';

export default async function SideBar() {
  const cx = classNames.bind(styles);

  const categories: Category[] = await getCategories();

  return (
    <div className={cx('sideBar-container')}>
      <h3 className={cx('sideBar-header')}>카테고리</h3>
      <ul className={cx('sideBar-list-container')}>
        {categories.map((category) => (
          <button className={cx('sideBar-list')} key={category.id}>
            {category.name}
          </button>
        ))}
      </ul>
    </div>
  );
}
