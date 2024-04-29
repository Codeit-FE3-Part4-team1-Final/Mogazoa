import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserDetail } from '@/types/types';

interface Form {
  description: string | null;
  nickname: string;
  image: string | null;
}

const useEditProfile = (userDetail: UserDetail) => {
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [userImage, setUserImage] = useState(userDetail.image);
  const [userName, setUserName] = useState(userDetail.nickname);
  const [userDescription, setUserDescription] = useState(
    userDetail.description,
  );

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    if (file?.size > FILE_MAX_SIZE) {
      alert('파일의 용량은 최대 5MB 입니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setUserImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOnBlurUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('nickname', { message: '닉네임은 필수 입력입니다.' });
    }
  };

  const resetFile = () => {
    reset({ image: null });
    setUserImage(null);
    console.log(userImage);
  };

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
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
