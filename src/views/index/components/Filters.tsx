import { reatomComponent } from '@reatom/npm-react';
import * as model from '../model';
import { subjectList } from '@/lib/static/artworkMeta';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const Filters = reatomComponent(({ ctx }) => {
  const currentFilter = ctx.spy(model.getSubjectParamsAtom());
  return (
    <div className="flex w-full items-center justify-center gap-1">
      <Button
        onClick={() => model.setParams(ctx, 'subject', '')}
        className={cn('h-12 w-14', {
          'bg-accent text-accent-foreground hover:bg-accent/90': !currentFilter,
        })}
      >
        All
      </Button>
      <div className="relative w-full overflow-hidden pl-[3.3rem] pr-12">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 4,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {subjectList.map((item) => (
              <CarouselItem
                key={item.params}
                className="basis-1/6 px-1 xl:basis-1/5 lg:basis-1/4"
              >
                <Button
                  onClick={() => model.setParams(ctx, 'subject', item.params)}
                  className={cn(
                    'line-clamp-2 h-12 w-full text-wrap py-1 capitalize',
                    {
                      'bg-accent text-accent-foreground hover:bg-accent/90':
                        item.params === currentFilter,
                    },
                  )}
                >
                  {item.name}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-11" />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}, 'Filters');
