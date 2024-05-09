import { SyntheticEvent } from 'react';

const handleErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}`;
};

export default handleErrorImage;
