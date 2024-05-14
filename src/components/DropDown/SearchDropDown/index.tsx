import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import styles from './SearchDropDown.module.scss';
import { Category } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  selectedSearchCategory: Category | null;
  dropItems: Category[];
  onSelect: (value: Category | null) => void;
}

export default function SearchDropDown({
  onSelect,
  selectedSearchCategory,
  dropItems,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (value: Category | null) => {
    onSelect(value);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx('dropdown-container')} ref={dropdownRef}>
      <button className={cx('dropdown-button')} onClick={toggleDropdown}>
        <div>
          {selectedSearchCategory ? selectedSearchCategory.name : '전체'}
        </div>
        <div className={cx('dropdown-arrow')}>{isOpen ? '▲' : '▼'}</div>
      </button>
      {isOpen && (
        <div className={cx('dropdown-content')} role='menu'>
          <ul>
            <li role='none'>
              <button
                type='button'
                className={cx('dropdown-item')}
                onClick={() => handleItemClick(null)}
                role='menuitem'
              >
                전체
              </button>
            </li>
            {dropItems.map((item) => (
              <li key={item.id} role='none'>
                <button
                  type='button'
                  className={cx('dropdown-item')}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  role='menuitem'
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
