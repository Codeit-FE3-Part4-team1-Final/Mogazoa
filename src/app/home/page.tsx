'use client';

import useAuthStore from '@/stores/userStore';

export default function Home() {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  return <div>{isLoggedIn ? 'yes' : 'no'}</div>;
}
