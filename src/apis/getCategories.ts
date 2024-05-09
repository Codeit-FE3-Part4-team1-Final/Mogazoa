'ues client';

import { useEffect, useState } from 'react';
import { axiosGet } from '@/utils/fetchUtils';
import { Category } from '@/types/types';

export default function getCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosGet('categories');
      setCategories(res);
    };

    fetchData();
  }, []);

  return categories;
}
