import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Search = () => {
  const [value, setValue] = useState('');
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <Dialog>
        <DialogTrigger className="flex h-full w-40 items-center gap-2 rounded-md border border-border px-2 transition-colors hover:border-border/50">
          <MagnifyingGlassIcon className="pointer-events-none size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Search</span>
        </DialogTrigger>
        <DialogContent className="min-h-[70dvh] max-w-[50rem] p-0 xs:border-x-0">
          <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
            <DialogHeader className="pointer-events-none absolute -top-[3.3rem] flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 p-2">
              <Input
                className="pointer-events-auto min-w-fit max-w-96 bg-background outline-none transition-all"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </DialogHeader>
            <div className="relative flex w-full justify-center"></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
