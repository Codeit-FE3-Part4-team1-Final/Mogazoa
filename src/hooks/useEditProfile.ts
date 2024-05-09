import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserRequestBody, UserDetail } from '@/types/types';
import uploadImage from '@/utils/uploadImage';
import patchProfile from '@/utils/patchProfile';
import { useModalStore } from '../../providers/ModalStoreProvider';
import generateRandomEnglishName from '@/utils/generateRandomEnglishName';

interface UpdateProfileMutationProps {
  body: UpdateUserRequestBody;
  userToken: string;
}

const useEditProfile = (userDetail: UserDetail, token: string) => {
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [imageUrl, setImageUrl] = useState('');
  const [userImage, setUserImage] = useState(userDetail.image);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userName, setUserName] = useState(userDetail.nickname);
  const [userDescription, setUserDescription] = useState(
    userDetail.description,
  );
  const { toggleModal, setModalType } = useModalStore((state) => state);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UpdateUserRequestBody>({
    mode: 'onBlur',
  });

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      return;
    }
    setUserName(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserDescription(e.target.value);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    const fileExtension = file.name.split('.').pop(); // 파일 확장자 추출

    if (fileExtension === 'svg') {
      alert('.svg 확장자는 업로드할 수 없습니다.');
      return;
    }

    if (file?.size > FILE_MAX_SIZE) {
      alert('파일의 용량은 최대 5MB 입니다.');
      return;
    }

    // 이미지 업로드 시 파일이름 영어 & 숫자만 있어야 에러나지 않음
    if (!/^[a-zA-Z0-9_\-.]+$/.test(file.name)) {
      const randomEnglishName = generateRandomEnglishName();
      const newFileName = `${randomEnglishName}.${fileExtension}`;

      const renamedFile = new File([file], newFileName, { type: file.type });

      setSelectedImage(renamedFile);
      setUserImage(URL.createObjectURL(renamedFile)); // 사진 미리보기
    } else {
      setSelectedImage(file);
      setUserImage(URL.createObjectURL(file)); //  사진 미리보기
    }
  };

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const upload = async () => {
      try {
        const url = await uploadImage(selectedImage, token);
        setImageUrl(url);
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      }
    };

    upload();
  }, [selectedImage]);

  const onBlurUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('nickname', { message: '닉네임은 필수 입력입니다.' });
    }
  };

  const resetFile = () => {
    reset({ image: null });
    setUserImage(null);
    setSelectedImage(null);
    setImageUrl('');
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, userToken }: UpdateProfileMutationProps) =>
      patchProfile(body, userToken),
    onSuccess: () => {
      router.refresh();
      toggleModal();
      setModalType(null);
    },
    onError: (data) => {
      setError('nickname', { message: data.message });
    },
  });

  const onSubmit: SubmitHandler<UpdateUserRequestBody> = async ({
    description,
    nickname,
    image,
  }) => {
    try {
      if (isPending) {
        return;
      }
      let body = { description, nickname, image };

      // 선택한 이미지 없으면 기본 이미지 등록
      if (
        !image ||
        (image?.length === 0 && process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL)
      ) {
        body = {
          ...body,
          image: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL as string,
        };
      }

      // 기존 유저의 프로필 이미지
      if (!selectedImage && userImage) {
        body = { ...body, image: userImage };
      }

      // 다른 이미지 선택 시
      if (selectedImage) {
        body = { ...body, image: imageUrl };
      }

      mutate({ body, userToken: token });
    } catch (error) {
      throw new Error('프로필 변경 실패');
    }
  };

  return {
    userImage,
    userName,
    userDescription,
    onChangeUserName,
    onChangeDescription,
    onChangeFile,
    onBlurUserName,
    resetFile,
    onSubmit,
    register,
    handleSubmit,
    errors,
    isPending,
  };
};

export default useEditProfile;
