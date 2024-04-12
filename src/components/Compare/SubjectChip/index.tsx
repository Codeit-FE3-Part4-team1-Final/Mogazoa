import classNames from 'classnames/bind';
import styles from './SubjectChip.module.scss';

const cx = classNames.bind(styles);

interface SubjectChipInterface {
  name: string;
}

export default function SubjectChip({ name }: SubjectChipInterface) {
  return (
    <>
      <div className={cx('container')}>
        {name}
        <div className={cx('close-container')}>
          <div className={cx('close-icon')} />
        </div>
      </div>
    </>
  );
}
