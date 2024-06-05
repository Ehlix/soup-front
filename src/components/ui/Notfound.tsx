import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const Notfound = (props: Props) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        props.className,
      )}
    >
      <h1>Not found</h1>
    </div>
  );
};
