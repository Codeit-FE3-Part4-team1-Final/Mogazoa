import classNames from 'classnames/bind';
import SideBar from '@/components/SideBar';
import styles from './page.module.scss';

export default function Home() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('home-container')}>
      <aside className={cx('aside')}>
        <SideBar />
      </aside>
      <main className={cx('main')}>메인 정보 구역</main>
      <section className={cx('ranking-section')}>랭킹 정보 구역</section>
    </div>
  );
}
