import { reatomComponent } from '@reatom/npm-react';
import * as model from '../model';
import { subjectList } from '@/lib/static/artworkMeta';
import { Button } from '@/components/ui/Button';
import { useRef } from 'react';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export const Filters = reatomComponent(({ ctx }) => {
  const filtersRef = useRef<HTMLDivElement>(null);
  const scrollHandler = (dir: 'left' | 'right') => {
    if (!filtersRef.current) return;
    if (dir === 'left') {
      filtersRef.current.scrollLeft -=
        window.innerWidth > 640
          ? window.innerWidth - 380
          : window.innerWidth - 100;
    } else {
      filtersRef.current.scrollLeft +=
        window.innerWidth > 640
          ? window.innerWidth - 380
          : window.innerWidth - 100;
    }
  };
  const currentFilter = ctx.spy(model.subjectParams);
  return (
    <div className="flex gap-1">
      <Button
        onClick={() => model.setParams(ctx, 'subject', '')}
        className={cn(
          !currentFilter &&
            'bg-accent text-accent-foreground hover:bg-accent/90',
        )}
      >
        All
      </Button>
      {!!currentFilter && (
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          {currentFilter}
        </Button>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scrollHandler('left')}
      >
        <TriangleLeftIcon className="size-6" />
      </Button>
      <div
        ref={filtersRef}
        className="flex gap-1 overflow-hidden scroll-smooth"
      >
        {subjectList.map((item) => (
          <Button
            key={item.params}
            onClick={() => model.setParams(ctx, 'subject', item.params)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scrollHandler('right')}
      >
        <TriangleLeftIcon className="size-6 rotate-180" />
      </Button>
    </div>
  );
}, 'Filters');
