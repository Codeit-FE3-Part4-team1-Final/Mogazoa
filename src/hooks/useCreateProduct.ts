import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import generateRandomEnglishName from '@/utils/generateRandomEnglishName';
import { CreateProductRequestBody } from '@/types/types';

const useCreateProduct = () => {
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductRequestBody>({
    mode: 'onBlur',
  });

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
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
      setPreviewImage(URL.createObjectURL(renamedFile));
    } else {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetFile = () => {
    reset({ image: null });
    setPreviewImage(null);
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<CreateProductRequestBody> = async (data) => {
    try {
      console.log(data);
      console.log(selectedImage);
    } catch (error) {
      throw new Error('상품 등록 실패');
    }
  };

  return {
    name,
    category,
    description,
    previewImage,
    handleFileChange,
    resetFile,
    onNameChange,
    onCategoryChange,
    onDescriptionChange,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};

export default useCreateProduct;
