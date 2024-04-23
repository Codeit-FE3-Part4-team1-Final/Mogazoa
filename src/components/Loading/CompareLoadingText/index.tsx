import classNames from 'classnames/bind';
import styles from './CompareLoadingText.module.scss';

const cx = classNames.bind(styles);

export default function CompareLoadingText() {
  return (
    <div className={cx('container')}>
      <div className={cx('text-container')}>
        <div>W</div>
        <div className={cx('text')}>W</div>
      </div>
      <div className={cx('text-container')}>
        <div>a</div>
        <div className={cx('text')}>a</div>
      </div>
      <div className={cx('text-container')}>
        <div>i</div>
        <div className={cx('text')}>i</div>
      </div>
      <div className={cx('text-container')}>
        <div>t</div>
        <div className={cx('text')}>t</div>
      </div>
      <div className={cx('text-container')}>
        <div>i</div>
        <div className={cx('text')}>i</div>
      </div>
      <div className={cx('text-container')}>
        <div>n</div>
        <div className={cx('text')}>n</div>
      </div>
      <div className={cx('text-container')}>
        <div>g</div>
        <div className={cx('text')}>g</div>
      </div>
      <div className={cx('text-container', 'dot')}>
        <div>.</div>
        <div className={cx('text')}>.</div>
      </div>
      <div className={cx('text-container', 'dot')}>
        <div>.</div>
        <div className={cx('text')}>.</div>
      </div>
      <div className={cx('text-container', 'dot')}>
        <div>.</div>
        <div className={cx('text')}>.</div>
      </div>
    </div>
  );
}
