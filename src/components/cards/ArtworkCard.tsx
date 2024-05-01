import { getImageUrl } from '@/lib/api/artworks';
import { useLoadImage } from '@/lib/hooks/userLoadImage';
import { cn } from '@/lib/utils';

export const ArtworkCard = (props: {
  className?: string;
  artwork: ArtworkResponse;
}) => {
  const image = useLoadImage(
    getImageUrl(props.artwork.thumbnail, props.artwork.userId),
  );
  // const avatar = useLoadImage(props.card.avatar || '');

  return (
    <div className={cn(props.className, 'group relative overflow-hidden')}>
      <div className="absolute bottom-0 left-0 opacity-0 transition-opacity group-hover:opacity-100">
        <h2>{props.artwork.title || 'Card title'}</h2>
      </div>
      <div className="h-full w-full">
        {image && (
          <img
            src={image}
            alt={props.artwork.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
