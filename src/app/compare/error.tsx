'use client';

import classNames from 'classnames/bind';
import styles from './ComparePageError.module.scss';

const cx = classNames.bind(styles);

export default function ComparePageError({ reset }: { reset: () => void }) {
  return (
    <div className={cx('container')}>
      <div className={cx('message-container')}>
        <div className={cx('header')}>
          <h2>알 수 없는 오류가 발생했습니다.</h2>
        </div>
        <div className={cx('button-container')}>
          <button
            type='button'
            onClick={() => reset()}
            className={cx('button')}
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
