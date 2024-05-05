import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';
import { ModalType, UserFolloweeList, UserFollowerList } from '@/types/types';

const useInfiniteFollow = (
  modalType: ModalType,
  fetchNextFollowee: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UserFolloweeList, unknown>, Error>
  >,
  fetchNextFollower: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UserFollowerList, unknown>, Error>
  >,
) => {
  const userListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { current } = userListRef;
      const isAtBottom = current
        ? current.scrollHeight - current.scrollTop - current.clientHeight <= 10
        : false;

      if (!isAtBottom) {
        return;
      }

      if (modalType === 'followees') {
        fetchNextFollowee();
      }
      if (modalType === 'followers') {
        fetchNextFollower();
      }
    }, 200);

    const userListElement = userListRef.current;
    if (userListElement) {
      userListElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (userListElement) {
        userListElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchNextFollowee, fetchNextFollower, modalType]);

  return userListRef;
};

export default useInfiniteFollow;
