import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserDetail } from '@/types/types';
import uploadImage from '@/utils/uploadImage';
import patchProfile from '@/utils/patchProfile';
import { useModalStore } from '../../providers/ModalStoreProvider';

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

    setSelectedImage(file);
    setUserImage(URL.createObjectURL(file));
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
      if (image && selectedImage) {
        const url = await uploadImage(selectedImage, token);
        body = { ...body, image: url };
      }
      const response = await patchProfile(body, token);

      if (response.ok) {
        toggleModal();
        router.refresh();
      }
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
