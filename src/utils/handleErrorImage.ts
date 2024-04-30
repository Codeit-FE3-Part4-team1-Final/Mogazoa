import { SyntheticEvent } from 'react';

const handleErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = '/images/profile-image.png';
};

export default handleErrorImage;
