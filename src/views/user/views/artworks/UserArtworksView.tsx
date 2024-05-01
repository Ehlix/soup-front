import { ArtworkCard } from '@/components/cards/ArtworkCard';
import { ArtworkLens } from '@/components/cards/ArtworkLens';
import { cn } from '@/lib/utils';
import { reatomComponent } from '@reatom/npm-react';
import { userDataAtom } from '../../model';

export const UserArtworksView = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(userDataAtom);
  if (!userData) return null;
  const artworks = ctx.spy(userData?.userArtworks.dataAtom).data;
  return (
    <div>
      <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {artworks &&
          artworks.map((artworks) => (
            <ArtworkLens key={artworks.id} artwork={artworks}>
              <ArtworkCard artwork={artworks} className={cn('aspect-square')} />
            </ArtworkLens>
          ))}
      </div>
    </div>
  );
}, 'UserArtworksView');
