import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ObjectChip.module.scss';

const cx = classNames.bind(styles);

interface ObjectChipInterface {
  name: string;
}

export default function ObjectChip({ name }: ObjectChipInterface) {
  return (
    <>
      <div className={cx('container')}>
        {name}
        <div className={cx('close-container')}>
          <Image
            src='/images/close-icon.svg'
            alt='닫기 아이콘'
            width={15}
            height={15}
            className={cx('close-icon')}
          />
        </div>
      </div>
    </>
  );
}
