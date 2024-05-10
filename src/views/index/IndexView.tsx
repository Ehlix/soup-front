import { ArtworkCard } from '@/components/cards/ArtworkCard';
import { ArtworkLens } from '@/components/cards/ArtworkLens';
import { cn } from '@/lib/utils';
import { reatomComponent } from '@reatom/npm-react';
import { getArtworks } from './model';

export const IndexView = reatomComponent(({ ctx }) => {
  const loading = ctx.spy(getArtworks.statusesAtom).isPending;
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {ctx.spy(getArtworks.dataAtom).data.map((card) => (
        <ArtworkLens key={card.id} artwork={card}>
          <ArtworkCard artwork={card} className={cn('aspect-square')} />
        </ArtworkLens>
      ))}
    </div>
  );
}, 'IndexView');
