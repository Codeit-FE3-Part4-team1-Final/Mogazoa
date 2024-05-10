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
            <p>
              MOGAZOA Copyright © 2024 Mogazoa - All rights reserved
              <br />
              <br />
              Designed By : Part4-1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
