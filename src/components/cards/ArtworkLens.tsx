import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Link } from '@tanstack/react-router';
import { getImageUrl } from '@/lib/api/artworks';

export const ArtworkLens = (props: {
  children: React.ReactNode;
  artwork: ArtworkResponse;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className={cn('h-full w-full', props.className)}>
        {props.children}
      </DialogTrigger>
      <DialogContent className="min-h-[90dvh] min-w-[90dvw] p-0">
        <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
          <DialogHeader className=" flex flex-row items-center gap-2 p-2 pr-16">
            <Link to={`/${props.artwork.userId}/artworks`}>
              <Avatar>
                <AvatarImage
                  src={getImageUrl(
                    props.artwork.user.userProfile.avatar,
                    props.artwork.userId,
                  )}
                />
                <AvatarFallback delayMs={600}>
                  {props.artwork.title}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="mx-auto flex flex-col">
              <DialogTitle>{props.artwork.title}</DialogTitle>
              <DialogDescription>{props.artwork.description}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="relative z-10 flex flex-col items-center gap-2 overflow-y-auto p-2 pt-0">
            {props.artwork.files.map((url) => (
              <div key={url + Math.random()} className="max-h-full w-full">
                <img
                  src={getImageUrl(url, props.artwork.userId)}
                  alt={props.artwork.title}
                  key={url}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};