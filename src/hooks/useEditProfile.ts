import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserDetail } from '@/types/types';
import uploadImage from '@/utils/uploadImage';
import patchProfile from '@/utils/patchProfile';
import { useModalStore } from '../../providers/ModalStoreProvider';
import generateRandomEnglishName from '@/utils/generateRandomEnglishName';

interface Form {
  description: string | null;
  nickname: string;
  image: File | string | null;
}

const useEditProfile = (userDetail: UserDetail, token: string) => {
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [userImage, setUserImage] = useState(userDetail.image);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [userName, setUserName] = useState(userDetail.nickname);
  const [userDescription, setUserDescription] = useState(
    userDetail.description,
  );
  const { toggleModal } = useModalStore((state) => state);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onBlur',
  });

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      return;
    }
    setUserName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserDescription(e.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
      setUserImage(URL.createObjectURL(renamedFile));
    } else {
      setSelectedImage(file);
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleOnBlurUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('nickname', { message: '닉네임은 필수 입력입니다.' });
    }
  };

  const resetFile = () => {
    reset({ image: null });
    setUserImage(null);
  };

  const onSubmit: SubmitHandler<Form> = async ({
    description,
    nickname,
    image,
  }) => {
    try {
      let body = { description, nickname, image };
      if (!image && process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL) {
        body = { ...body, image: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL };
      }
      if (image && selectedImage) {
        const url = await uploadImage(selectedImage, token);
        body = { ...body, image: url };
      }
      if (!selectedImage && userImage) {
        body = { ...body, image: userImage };
      }
      const response = await patchProfile(body, token);

      if (response.ok) {
        toggleModal();
        router.refresh();
      }
      const error = await response.json();
      setError('nickname', { message: error.message });
    } catch (error) {
      throw new Error('프로필 변경 실패');
    }
  };

  return {
    userImage,
    userName,
    userDescription,
    handleChangeUserName,
    handleChangeDescription,
    handleFileChange,
    handleOnBlurUserName,
    resetFile,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};

export default useEditProfile;
