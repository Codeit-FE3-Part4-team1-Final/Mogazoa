import classNames from 'classnames/bind';
import styles from './RankingChip.module.scss';

interface Props {
  ranking: number;
}

export default function RankingChip({ ranking }: Props) {
  const cx = classNames.bind(styles);

  let rankingClassName = '';
  if (ranking === 1) {
    rankingClassName = 'first';
  } else if (ranking === 2) {
    rankingClassName = 'second';
  } else if (ranking >= 3 && ranking <= 6) {
    rankingClassName = 'third-to-eighth';
  }

  return <div className={cx('chip', styles[rankingClassName])}>{ranking}</div>;
}
