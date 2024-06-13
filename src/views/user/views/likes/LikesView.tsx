import { ArtworkCard } from '@/components/cards/ArtworkCard';
import { ArtworkLens } from '@/components/cards/ArtworkLens';
import { cn } from '@/lib/utils';
import { reatomComponent } from '@reatom/npm-react';
import { userDataAtom } from '../../model';

export const LikesView = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(userDataAtom);
  if (!userData) return null;
  const artworksLikes = ctx.spy(userData?.userLikesArtworks.dataAtom)?.data;
  return (
    <div>
      <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {artworksLikes &&
          artworksLikes.map((data) => (
            <ArtworkLens key={data.id} artwork={data.artwork}>
              {{
                trigger: (
                  <ArtworkCard
                    artwork={data.artwork}
                    className={cn('aspect-square')}
                  />
                ),
              }}
            </ArtworkLens>
          ))}
      </div>
    </div>
  );
}, 'LikesView');
