import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import generateRandomEnglishName from '@/utils/generateRandomEnglishName';
import { CreateReviewRequestBody, Review } from '@/types/types';
import uploadImage from '@/utils/uploadImage';
import { useModalStore } from '../../providers/ModalStoreProvider';
import createReview from '@/utils/createReview.ts';

const token = getCookie('accessToken') || '';

const useCreateReview = (productId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const FILE_MAX_SIZE = 5 * 1024 * 1024;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const { toggleModal, setModalType } = useModalStore((state) => state);

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
  } = useForm<CreateReviewRequestBody>({
    defaultValues: { rating: 0, productId },
    mode: 'onBlur',
  });

  const content = watch('content', '');
  const rating = watch('rating');

  const onBlurContent = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 10) {
      setError('content', { message: '리뷰 내용은 필수 입력입니다.' });
    } else {
      clearErrors('content');
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('content', event.target.value, { shouldValidate: true });
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

  const resetFile = () => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      images: [],
    });

    setPreviewImage(null);
    setSelectedImage(null);
    setImageUrl('');
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (body: CreateReviewRequestBody) => createReview(body),
    onSuccess: (review: Review) => {
      queryClient.invalidateQueries({
        queryKey: ['user-reviewed-products'],
      });

      router.push(`/product/${review.productId}`);
      toggleModal();
      setModalType(null);
    },
  });

  const onSubmit: SubmitHandler<CreateReviewRequestBody> = async (data) => {
    try {
      if (isPending) {
        return;
      }

      if (!selectedImage) {
        setError('images', { message: '대표 이미지를 추가해주세요.' });
        return;
      }

      if (data.content.length < 10) {
        setError('content', {
          message: '최소 10자 이상 적어주세요',
        });
        return;
      }

      const body = { ...data, images: [imageUrl] };

      mutate(body);
    } catch (error) {
      throw new Error('상품 등록 실패');
    }
  };

  return {
    content,
    previewImage,
    onChangeFile,
    resetFile,
    onChangeContent,
    onSubmit,
    register,
    handleSubmit,
    onBlurContent,
    errors,
    isPending,
    setValue,
  };
};

export default useCreateReview;
