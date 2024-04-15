import classNames from 'classnames/bind';
import styles from './ActivityCard.module.scss';

const cx = classNames.bind(styles);

export default function ActivityCard() {
  return <div className={cx('activity')}>ActivityCard</div>;
}
