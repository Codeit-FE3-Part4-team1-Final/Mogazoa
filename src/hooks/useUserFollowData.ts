import { useLayoutEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '../../providers/ModalStoreProvider';
import { ModalType } from '@/components/Card/ProfileCard';
import { UserFolloweeList, UserFollowerList } from '@/types/types';
import {
  getUserFolloweeList,
  getUserFollowerList,
} from '@/utils/getUserFollowList';

const useUserFollowData = (userId: string) => {
  const { isOpened, toggleModal } = useModalStore((state) => state);
  const [modalType, setModalType] = useState<ModalType>('followers');
  const [followData, setFollowData] = useState<
    UserFollowerList | UserFolloweeList
  >();

  const { data: follower } = useQuery<UserFollowerList | UserFolloweeList>({
    queryKey: ['user-follower-list', userId],
    queryFn: () => getUserFollowerList(userId),
    staleTime: 60 * 5 * 1000,
  });
  const { data: followee } = useQuery<UserFollowerList | UserFolloweeList>({
    queryKey: ['user-followee-list', userId],
    queryFn: () => getUserFolloweeList(userId),
    staleTime: 60 * 5 * 1000,
  });

  const handleToggleModal = async (type: ModalType) => {
    setModalType(type);

    toggleModal();
  };

  useLayoutEffect(() => {
    if (modalType === 'followers') {
      setFollowData(follower);
    }
    if (modalType === 'followees') {
      setFollowData(followee);
    }
  }, [modalType, follower, followee]);

  return { isOpened, followData, modalType, handleToggleModal };
};

export default useUserFollowData;
