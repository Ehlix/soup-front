import { cards } from '@/lib/cardsDummy';
import { Card } from '@/components/cards/PicturesCard';
import { CardLens } from '@/components/cards/PicturesLens';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$user/pictures/$folder')({
  component: () => {
    return (
      <div>
        <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {cards.map((card) => (
            <CardLens key={card.id} card={card}>
              <Card card={card} className={cn('aspect-square')} />
            </CardLens>
          ))}
        </div>
      </div>
    );
  },
});
