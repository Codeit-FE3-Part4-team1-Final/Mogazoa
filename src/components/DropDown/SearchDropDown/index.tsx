import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import styles from './SearchDropDown.module.scss';

const cx = classNames.bind(styles);

interface MenuItem {
  key: string;
  label: string;
}

interface Props {
  buttonLabel: string;
  dropItems: MenuItem[];
  onSelect: (value: string) => void;
}

export default function SearchDropDown({
  onSelect,
  buttonLabel,
  dropItems,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const findLabelByKey = (key: string) => {
    const findItem = dropItems.find((item) => item.key === key);
    return findItem ? findItem.label : undefined;
  };

  console.log(dropItems[0]);

  const handleItemClick = (value: string) => {
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
        <div>{findLabelByKey(buttonLabel)}</div>
        <div className={cx('dropdown-arrow')}>{isOpen ? '▲' : '▼'}</div>
      </button>
      {isOpen && (
        <div className={cx('dropdown-content')} role='menu'>
          <ul>
            {dropItems.map((item) => (
              <li key={item.key} role='none'>
                <button
                  type='button'
                  className={cx('dropdown-item')}
                  onClick={() => {
                    handleItemClick(item.key);
                  }}
                  role='menuitem'
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
