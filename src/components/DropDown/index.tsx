import { useState, useEffect, useRef } from 'react';

import cx from './cx.ts';

interface MenuItem {
  key: string;
  label: string;
}

interface Props {
  buttonLabel: string;
  dropItems: MenuItem[];
  onSelect: (value: string) => void;
}

export default function DropDown({
  onSelect,
  buttonLabel,
  dropItems,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function findLabelByKey(key: string): string | undefined {
    const findItem = dropItems.find((item) => item.key === key);
    return findItem ? findItem.label : undefined;
  }

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
      <button onClick={toggleDropdown}>
        {findLabelByKey(buttonLabel)} {isOpen ? '▲' : '▼'}
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
