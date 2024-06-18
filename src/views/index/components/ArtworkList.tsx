import { ArtworkCard } from '@/components/cards/ArtworkCard';
import { ArtworkLens } from '@/components/cards/ArtworkLens';
import { cn } from '@/lib/utils';
import { reatomComponent } from '@reatom/npm-react';
import * as model from '../model';
import { FollowCard } from '@/components/cards/FollowCard';

export const ArtworkList = reatomComponent(({ ctx }) => {
  const loading = ctx.spy(model.artworks.statusesAtom).isPending;
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {ctx.spy(model.artworks.dataAtom)?.map((card) => (
        <ArtworkLens key={card.id} artwork={card}>
          {{
            trigger: (
              <ArtworkCard artwork={card} className={cn('aspect-square')} />
            ),
            followButton: <FollowCard followId={card.userId} />,
          }}
        </ArtworkLens>
      ))}
    </div>
  );
}, 'ArtworkList');
