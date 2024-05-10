import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './TopScroll.module.scss';

const cx = classNames.bind(styles);

export default function TopScroll() {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={handleScroll} className={cx('container')}>
      <button type='button'>
        <Image
          src={'/images/arrow-top.svg'}
          alt='화살표 아이콘'
          width={20}
          height={20}
          className={cx('image')}
        />
      </button>
    </div>
  );
}
