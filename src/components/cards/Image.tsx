import { useLoadImage } from '@/lib/hooks/userLoadImage';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export const Image = (props: { className?: string; src: string }) => {
  const [image, setImage] = useLoadImage(props.src);
  useEffect(() => {
    if (props.src) {
      setImage(props.src);
    }
  }, [props.src, setImage]);
  return (
    <div className={cn(props.className, 'h-full w-full')}>
      {image && (
        <img src={image} alt={'image'} className="h-full w-full object-cover" />
      )}
    </div>
  );
};
