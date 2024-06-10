import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@tanstack/react-router';
import { getImageUrl } from '@/lib/api/artworks';

export const ArtworkLens = (props: {
  children: {
    trigger: React.ReactNode;
    followButton?: React.ReactNode;
  };
  artwork: ArtworkResponse;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className={cn('h-full w-full', props.className)}>
        {props.children.trigger}
      </DialogTrigger>
      <DialogContent className="min-h-[90dvh] min-w-[95dvw] p-0 xs:border-x-0">
        <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
          <DialogHeader className=" flex flex-row flex-wrap-reverse items-center justify-center gap-2 p-2 pr-4">
            <div className="flex flex-col items-center justify-center">
              <DialogTitle className="text-2xl font-bold capitalize text-foreground">
                {props.artwork.title}
              </DialogTitle>
              <DialogDescription className="text-md text-muted-foreground">
                {props.artwork.description}
              </DialogDescription>
            </div>
            <div className="ml-auto flex gap-2">
              <div className="flex flex-col justify-center gap-2">
                <Link to={`/${props.artwork.userId}/artworks`}>
                  <h2 className="text-xl font-bold capitalize text-foreground">
                    {props.artwork.user.userProfile.name}
                  </h2>
                </Link>
                {/* <p className="text-md capitalize text-muted-foreground">
                {props.artwork.user.userProfile.headline}
              </p> */}
                {props.children.followButton}
              </div>
              <Link to={`/${props.artwork.userId}/artworks`}>
                <Avatar className="size-16">
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
