'ues client';

import { useEffect, useState } from 'react';
import { axiosGet } from '@/utils/fetchUtils';
import { UserRanking } from '@/types/types';

export default function getRanking(): UserRanking[] {
  const [userRankings, setUserRankings] = useState<UserRanking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet('users/ranking');
        setUserRankings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return userRankings;
}
