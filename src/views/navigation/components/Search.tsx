import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import * as model from '../model';
import { reatomComponent } from '@reatom/npm-react';
import { Link } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';

export const Search = reatomComponent(({ ctx }) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex h-full w-40 items-center gap-2 rounded-md border border-border px-2 transition-colors hover:border-border/50">
            <MagnifyingGlassIcon className="pointer-events-none size-5 text-muted-foreground" />
            <span className="text-muted-foreground">Search</span>
          </div>
        </DialogTrigger>
        <DialogContent className="top-14 min-h-fit min-w-[85dvw] translate-y-0 p-0 xs:border-x-0">
          <div className="bg-mc-1 grid grid-rows-[auto_minmax(0,1fr)_auto] rounded">
            <DialogHeader className="pointer-events-none absolute -top-[3.3rem] flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 p-2">
              <DialogTitle>
                <Input
                  className="pointer-events-auto min-w-fit max-w-96 bg-background outline-none transition-all sm:max-w-72 xs:max-w-56"
                  placeholder="Search"
                  value={ctx.spy(model.searchValue)}
                  onChange={(e) => model.changeSearchValue(ctx, e.target.value)}
                />
              </DialogTitle>
            </DialogHeader>
            <div
              className={cn(
                'relative flex w-full flex-col justify-center p-0',
                {
                  'p-2': ctx.spy(model.searchResource.dataAtom)?.length,
                },
              )}
            >
              {ctx.spy(model.searchResource.dataAtom)?.map((profile) => (
                <DialogClose asChild key={profile.id}>
                  <Link to={`/${profile.site}/artworks`} as="button">
                    <div className="flex gap-2">
                      <Avatar className="size-8">
                        <AvatarImage
                          src={getImageUrl(profile.avatar, profile.userId)}
                        />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                      <h2>{profile.name}</h2>
                    </div>
                  </Link>
                </DialogClose>
              ))}
            </div>
          </div>
          <DialogDescription className="sr-only">
            Search result
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}, 'Search');
