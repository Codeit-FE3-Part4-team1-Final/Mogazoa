import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import generateRandomEnglishName from '@/utils/generateRandomEnglishName';
import { Category, CreateProductRequestBody } from '@/types/types';

const categoryList: Category[] = [
  {
    id: 1,
    name: '음악',
  },
  {
    id: 2,
    name: '영화/드라마',
  },
  {
    id: 3,
    name: '강의/책',
  },
  {
    id: 4,
    name: '호텔',
  },
  {
    id: 5,
    name: '가구/인테리어',
  },
  {
    id: 6,
    name: '식당',
  },
  {
    id: 7,
    name: '전자기기',
  },
  {
    id: 8,
    name: '화장품',
  },
  {
    id: 9,
    name: '의류/잡화',
  },
  {
    id: 10,
    name: '앱',
  },
];

const useCreateProduct = () => {
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CreateProductRequestBody>({
    mode: 'onBlur',
  });

  const name = watch('name', '');
  const categoryId = watch('categoryId', 0);
  const description = watch('description', '');

  const onBlurName = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setError('name', { message: '상품 이름은 필수 입력입니다.' });
    } else {
      clearErrors('name');
    }
  };

  const onBlurDescription = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 10) {
      setError('description', { message: '상품 설명은 필수 입력입니다.' });
    } else {
      clearErrors('description');
    }
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 20) {
      return;
    }
    setValue('name', event.target.value, { shouldValidate: true });
  };

  const onChangeCategory = (id: number) => {
    setValue('categoryId', id, {
      shouldValidate: true,
    });
  };

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('description', event.target.value, { shouldValidate: true });
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
      setPreviewImage(URL.createObjectURL(renamedFile));
    } else {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetFile = () => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      image: null,
    });

    setPreviewImage(null);
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<CreateProductRequestBody> = async (data) => {
    try {
      if (!selectedImage) {
        setError('image', { message: '대표 이미지를 추가해주세요.' });
        return;
      }
      if (!data.categoryId) {
        setError('categoryId', { message: '카테고리를 선택해주세요.' });
        return;
      }
      if (data.description.length < 10) {
        setError('description', {
          message: '최소 10자 이상 적어주세요',
        });
        return;
      }
      console.log(data, selectedImage);
    } catch (error) {
      throw new Error('상품 등록 실패');
    }
  };

  return {
    name,
    categoryId,
    description,
    previewImage,
    onChangeFile,
    resetFile,
    onChangeName,
    onChangeCategory,
    onChangeDescription,
    onSubmit,
    register,
    handleSubmit,
    onBlurName,
    onBlurDescription,
    errors,
    categoryList,
  };
};

export default useCreateProduct;
