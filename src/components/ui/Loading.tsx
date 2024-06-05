import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const Loading = (props: Props) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        props.className,
      )}
    >
      <h1>Loading...</h1>
    </div>
  );
};
