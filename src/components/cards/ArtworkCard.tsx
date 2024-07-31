import { getImageUrl } from '@/lib/api/artworks';
import { useLoadImage } from '@/lib/hooks/userLoadImage';
import { cn } from '@/lib/utils';

export const ArtworkCard = (props: {
  className?: string;
  artwork: Artwork & Partial<ArtworkResponse>;
}) => {
  const [image] = useLoadImage(
    getImageUrl(props.artwork.thumbnail, props.artwork.userId),
  );

  return (
    <div
      className={cn(props.className, 'group relative overflow-hidden rounded')}
    >
      <div className="absolute bottom-0 left-0 z-20 h-fit w-full px-2 text-left opacity-0 transition-opacity group-hover:opacity-100">
        <h3>{props.artwork.title || ''}</h3>
      </div>
      <div className="h-full w-full">
        {image && (
          <img
            src={image}
            alt={props.artwork.title}
            className="z-10 h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        )}
      </div>
    </div>
  );
};
