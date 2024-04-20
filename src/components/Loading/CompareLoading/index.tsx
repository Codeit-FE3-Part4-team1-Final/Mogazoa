import classNames from 'classnames/bind';
import styles from './CompareLoading.module.scss';

const cx = classNames.bind(styles);

export default function CompareLoading() {
  return (
    <div className={cx('container')}>
      <div className={cx('circle')}></div>
      <div className={cx('circle')}></div>
      <div className={cx('circle')}></div>
      <div className={cx('shadow')}></div>
      <div className={cx('shadow')}></div>
      <div className={cx('shadow')}></div>
    </div>
  );
}
