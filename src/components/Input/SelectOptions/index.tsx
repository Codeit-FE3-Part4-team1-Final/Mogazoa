import classNames from 'classnames/bind';
import styles from './SelectOptions.module.scss';
import { Category } from '@/types/types';

const cx = classNames.bind(styles);

interface Props {
  optionList: Category[];
  handleChange: (id: number) => void;
  selectCategory: (category: string) => void;
}

export default function SelectOptions({
  optionList,
  handleChange,
  selectCategory,
}: Props) {
  return (
    <ul className={cx('wrapper')}>
      {optionList.map((option) => {
        return (
          <li
            value={option.id}
            key={option.id}
            onClick={() => {
              handleChange(option.id);
              selectCategory(option.name);
            }}
          >
            {option.name}
          </li>
        );
      })}
    </ul>
  );
}
