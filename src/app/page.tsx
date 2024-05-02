'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SideBar from '@/components/SideBar';
import styles from './page.module.scss';
import getProduct from '@/apis/getProduct.ts';
import { Category } from '@/types/types';
import DropDown from '@/components/DropDown';
import getRanking from '@/apis/getRanking';
import RankingCard from '@/components/Card/RankingCard';
import ProductCard from '@/components/Card/ProductCard';
import useSidebarStore from '@/stores/sidebarStore';

interface MenuItem {
  key: string;
  label: string;
}

export default function Home() {
  const cx = classNames.bind(styles);

  const userRankings = getRanking();

  const { isSidebarVisible } = useSidebarStore();

  const [sortTitle, setSortTitle] = useState<string>('HOT');
  const [selectedSort, setSelectedSort] = useState<string>('reviewCount');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: sortProducts } = useQuery({
    queryKey: [`${selectedCategory?.name}${selectedSort}`],
    queryFn: () =>
      getProduct({ category: selectedCategory?.id, order: selectedSort }),
  });

  const { data: categoryProducts } = useQuery({
    queryKey: [`${selectedCategory?.name}Product`],
    queryFn: () => getProduct({ category: selectedCategory?.id }),
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.9,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.9,
        },
      },
    ],
  };

  const menuItems: MenuItem[] = [
    { key: 'reviewCount', label: '리뷰순' },
    { key: 'rating', label: '별점순' },
    { key: 'recent', label: '최신순' },
  ];

  return (
    <div className={cx('home-wrapper')}>
      <div className={cx('home-container')}>
        <aside
          className={cx('sidebar', { 'sidebar-visible': isSidebarVisible })}
        >
          <SideBar setSelectedCategory={setSelectedCategory} />
        </aside>
        <main className={cx('main')}>
          {selectedCategory === null ? (
            '바보'
          ) : (
            <>
              <section className={cx('product-info')}>
                <div className={cx('header')}>
                  <p className={cx('title')}>
                    <span className={cx('title-point')}>{sortTitle} </span>
                    상품
                  </p>
                  <DropDown
                    buttonLabel={selectedSort}
                    dropItems={menuItems}
                    onSelect={handleSortChange}
                  />
                </div>
                <div className={cx('itemList')}>
                  {sortProducts?.list ? (
                    <Slider
                      {...settings}
                      key={selectedCategory ? selectedCategory.name : 'default'}
                    >
                      {sortProducts?.list.map((productItem) => (
                        <div className={cx('item')} key={productItem.id}>
                          <ProductCard productItem={productItem} />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </section>
              <section className={cx('all-product')}>
                <div className={cx('header')}>
                  <p className={cx('title')}>
                    <span className={cx('title-point')}>
                      {selectedCategory.name}{' '}
                    </span>
                    전체 상품
                  </p>
                </div>
                <div className={cx('product-list-grid')}>
                  {categoryProducts?.list.map((productItem) => (
                    <ProductCard
                      key={productItem.id}
                      productItem={productItem}
                    />
                  ))}
                </div>
              </section>
            </>
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
    </div>
  );
}
