import classNames from 'classnames/bind';
import styles from './TextBoxInput.module.scss';

const cx = classNames.bind(styles);

export default function TextBoxInput() {
  return (
    <label className={cx('wrapper')} htmlFor='text-area'>
      <textarea className={cx('text-area')} id='text-area' />
      <p className={cx('text-count')}>19/300</p>
    </label>
  );
}
