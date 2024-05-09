import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('items', 'one')}>
          <div className={cx('items', 'two')}>
            <div className={cx('items', 'three')}>
              <div className={cx('items', 'four')}>
                <div className={cx('items', 'five')}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
