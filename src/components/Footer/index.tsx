import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('one')}>
          <div className={cx('two')}>
            <div className={cx('three')}>
              <div className={cx('four')}>
                <div className={cx('five')}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
