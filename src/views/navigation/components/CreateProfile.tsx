import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Search = () => {
  const [value, setValue] = useState('');
  return (
    <div className="relative flex w-full justify-center">
      <Input
        className={cn(
          'peer max-w-80 rounded-full outline-none transition-all placeholder-shown:opacity-0 focus:w-full focus:opacity-100 focus:backdrop-blur-md',
          {
            'w-[4.3rem] border-none opacity-0': !value,
          },
        )}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
      <MagnifyingGlassIcon
        className={cn(
          'pointer-events-none absolute top-2 size-5 text-muted-foreground  transition-opacity peer-focus:opacity-0',
          {
            'opacity-0': value,
          },
        )}
      />
    </div>
  );
};
