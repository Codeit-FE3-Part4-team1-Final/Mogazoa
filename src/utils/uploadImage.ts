const uploadImage = async (image: File, token: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_HOST}/images/upload`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    const result = await response.json();
    return result.url;
  } catch (error) {
    throw new Error('파일 업로드 실패');
  }
};

export default uploadImage;
