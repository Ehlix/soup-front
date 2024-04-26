import { useState } from 'react';

// type Result<T extends string | string[]> = [
//   T | null,
//   React.Dispatch<React.SetStateAction<T | null>>,
// ];

export const useLoadImage = <T extends string>(src: T): T | null => {
  const [loadedImages, setLoadedImages] = useState<T | null>(null);

  if (!src) return null;

  if (!loadedImages) {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoadedImages(image.src as T);
    };
  }
  // await image.decode();
  // return image;
  // if (typeof src === "string") {
  //   const image = loadImage(src);
  //   setLoadedImages(image);
  // } else if (Array.isArray(src)) {
  //   src.forEach((s) => {
  //     loadImage(s);
  //   });
  // }
  return loadedImages;
};
