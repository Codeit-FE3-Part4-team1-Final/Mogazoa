'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import classNames from 'classnames/bind';
import SideBar from '@/components/SideBar';
import styles from './page.module.scss';
import getProduct from '@/apis/getProduct.ts';
import getRanking from '@/apis/getRanking';
import RankingCard from '@/components/Card/RankingCard';
import useSidebarStore from '@/stores/sidebarStore';
import useSearchInputStore from '@/stores/searchValueStore';
import CategoryMain from '@/components/Home/CategoryMain/CategoryMain';
import CommonMain from '@/components/Home/CommonMain/CommonMain';
import useSelectedCategoryStore from '@/stores/categoryStore';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

// Todo(송상훈) :
export default function Home() {
  const userRankings = getRanking();

  const { isSidebarVisible } = useSidebarStore();
  const { inputValue } = useSearchInputStore();
  const { selectedCategory, setSelectedCategory } = useSelectedCategoryStore();

  const [sortTitle, setSortTitle] = useState<string>('HOT');
  const [selectedSort, setSelectedSort] = useState<string>('reviewCount');

  const { data: sortProducts } = useQuery({
    queryKey: [`${selectedCategory?.name}${selectedSort}`],
    queryFn: () =>
      getProduct({ category: selectedCategory?.id, order: selectedSort }),
  });

  const { data: categoryProducts } = useQuery({
    queryKey: [`${selectedCategory?.name}Product`, inputValue],
    queryFn: () =>
      getProduct({ category: selectedCategory?.id, keyword: inputValue }),
  });

  const { data: allProducts } = useQuery({
    queryKey: [`${selectedSort}all-Products`, inputValue],
    queryFn: () => getProduct({ order: selectedSort, keyword: inputValue }),
  });

  const handleSortChange = (sortType: string) => {
    setSelectedSort(sortType);

    if (sortType === 'recent') {
      setSortTitle('NEW');
    } else if (sortType === 'reviewCount') {
      setSortTitle('HOT');
    } else {
      setSortTitle('TOP');
    }
  };

  return (
    <div className={cx('home-wrapper')}>
      <div className={cx('home-container')}>
        <aside
          className={cx('sidebar', { 'sidebar-visible': isSidebarVisible })}
        >
          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </aside>
        <main className={cx('main')}>
          {selectedCategory === null ? (
            <CommonMain
              products={allProducts}
              sortTitle={sortTitle}
              inputValue={inputValue}
              selectedSort={selectedSort}
              onSelect={handleSortChange}
            />
          ) : (
            <CategoryMain
              sortTitle={sortTitle}
              selectedSort={selectedSort}
              onSelect={handleSortChange}
              selectedCategory={selectedCategory}
              inputValue={inputValue}
              categoryProducts={categoryProducts}
              sortProducts={sortProducts}
            />
          )}
        </main>
        <section className={cx('ranking-section')}>
          <div className={cx('ranking-header')}>리뷰어 랭킹</div>
          <div className={cx('ranking-items')}>
            <div className={cx('ranking-item')}>
              {userRankings
                ?.slice(0, 6)
                .map((userRanking, index) => (
                  <RankingCard
                    key={userRanking.id}
                    userRanking={userRanking}
                    rankingIndex={index + 1}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
