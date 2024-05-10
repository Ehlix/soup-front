import { useEffect, useState } from 'react';

export const useLoadImage = <T extends string>(
  src: T,
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
  const image = new Image();
  const [imageToLoad, setImageToLoad] = useState<T | null>(src);
  const [loadedImages, setLoadedImages] = useState<T | null>(null);
  useEffect(() => {
    image.src = imageToLoad || '';
  });

  image.onload = () => {
    setLoadedImages(image.src as T);
  };
  return [loadedImages, setImageToLoad];
};
