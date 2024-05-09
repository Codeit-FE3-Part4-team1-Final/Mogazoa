import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('button')}></div>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('items')}>
            <h3>Classy footer text</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
