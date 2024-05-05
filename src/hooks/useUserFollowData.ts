import { MouseEvent, useLayoutEffect, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useModalStore } from '../../providers/ModalStoreProvider';
import { ModalType, UserFolloweeList, UserFollowerList } from '@/types/types';
import {
  getUserFolloweeList,
  getUserFollowerList,
} from '@/utils/getUserFollowList';
import followUser from '@/utils/followUser';

const useUserFollowData = (
  userId: string,
  token: string,
  isLoggedIn: boolean,
) => {
  const pathname = usePathname();
  const route = useRouter();
  const queryClient = useQueryClient();
  const { isOpened, toggleModal, modalType, setModalType } = useModalStore(
    (state) => state,
  );
  const [followData, setFollowData] = useState<
    UserFollowerList[] | UserFolloweeList[] | undefined
  >(undefined);

  const { data: follower, fetchNextPage: fetchNextFollower } = useInfiniteQuery(
    {
      queryKey: ['user-follower-list', userId],
      queryFn: ({ pageParam }) => getUserFollowerList(userId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      staleTime: 10 * 1000,
      gcTime: 10 * 1000,
    },
  );

  const { data: followee, fetchNextPage: fetchNextFollowee } = useInfiniteQuery(
    {
      queryKey: ['user-followee-list', userId],
      queryFn: ({ pageParam }) => getUserFolloweeList(userId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      staleTime: 10 * 1000,
      gcTime: 10 * 1000,
    },
  );

  const handleToggleModal = async (type: ModalType) => {
    setModalType(type);

    toggleModal();
  };

  const followMutation = useMutation({
    mutationFn: () => followUser(userId, token, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-follower-list', userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-followee-list', userId],
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => followUser(userId, token, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-follower-list', userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-followee-list', userId],
      });
    },
  });

  const handleClickFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      route.push('/signin');
      return;
    }
    followMutation.mutate(undefined, {
      onSuccess: () => {
        route.refresh();
      },
      onError: () => {
        throw new Error('failed to follow');
      },
    });
  };

  const handleClickUnFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      route.push('/signin');
      return;
    }
    unfollowMutation.mutate(undefined, {
      onSuccess: () => {
        route.refresh();
      },
      onError: () => {
        throw new Error('failed to follow');
      },
    });
  };

  useLayoutEffect(() => {
    if (modalType === 'followers') {
      setFollowData(follower?.pages);
    }
    if (modalType === 'followees') {
      setFollowData(followee?.pages);
    }
  }, [modalType, follower, followee]);

  return {
    pathname,
    followMutation,
    unfollowMutation,
    isOpened,
    followData,
    modalType,
    handleToggleModal,
    handleClickFollow,
    handleClickUnFollow,
    fetchNextFollowee,
    fetchNextFollower,
  };
};

export default useUserFollowData;
