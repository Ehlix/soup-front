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
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';
import { artworkLikeFactory, sessionDataAtom } from '@/model';
import { Button } from '../ui/Button';
import {
  EnterFullScreenIcon,
  HeartFilledIcon,
  HeartIcon,
} from '@radix-ui/react-icons';

type Props = {
  children: {
    trigger: React.ReactNode;
    followButton?: React.ReactNode;
  };
  artwork: Artwork & Partial<ArtworkResponse>;
  className?: string;
};
export const ArtworkLens = reatomComponent<Props>(
  ({ ctx, children, artwork, className }) => {
    const { likesCount, isLiked, like, dislike, checkLike } = useMemo(
      () => artworkLikeFactory(ctx, artwork.id),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [artwork.id],
    );
    const sessionDataProfile = ctx.spy(sessionDataAtom)?.userProfile;
    return (
      <Dialog>
        <DialogTrigger className={cn('h-full w-full', className)}>
          {children.trigger}
        </DialogTrigger>
        <DialogContent className="min-h-[90dvh] min-w-[95dvw] p-0 xs:border-x-0">
          <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
            <DialogHeader className="flex flex-row flex-wrap-reverse items-center justify-center gap-2 p-2 pr-4">
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col">
                  <DialogTitle className="text-2xl font-bold capitalize text-foreground">
                    {artwork.title}
                  </DialogTitle>
                  <DialogDescription className="text-md text-muted-foreground">
                    {artwork.description}
                  </DialogDescription>
                </div>
                <div className="flex items-center">
                  {sessionDataProfile ? (
                    ctx.spy(isLiked) ? (
                      <Button
                        disabled={ctx.spy(checkLike.statusesAtom).isPending}
                        variant="like"
                        size="icon"
                        className="rounded-full text-accent"
                        onClick={() => dislike(ctx)}
                      >
                        <HeartFilledIcon className="size-6" />
                      </Button>
                    ) : (
                      <Button
                        disabled={ctx.spy(checkLike.statusesAtom).isPending}
                        variant="like"
                        size="icon"
                        className="rounded-full text-accent"
                        onClick={() => like(ctx)}
                      >
                        <HeartIcon className="size-6" />
                      </Button>
                    )
                  ) : (
                    <Link to="/auth">
                      <Button variant="like" size="icon">
                        <HeartIcon className="size-6" />
                      </Button>
                    </Link>
                  )}
                  <div className="text-muted-foreground">
                    {ctx.spy(likesCount)}
                  </div>
                </div>
              </div>
              {artwork.user && (
                <div className="ml-auto flex gap-2">
                  <div className="flex flex-col justify-center gap-2">
                    <Link to={`/${artwork.userId}/artworks`}>
                      <h2 className="text-xl font-bold capitalize text-foreground">
                        {artwork.user.userProfile.name}
                      </h2>
                    </Link>
                    {/* <p className="text-md capitalize text-muted-foreground">
                {artwork.user.userProfile.headline}
              </p> */}
                    {children.followButton}
                  </div>
                  <Link to={`/${artwork.userId}/artworks`}>
                    <Avatar className="size-16">
                      <AvatarImage
                        src={getImageUrl(
                          artwork.user.userProfile.avatar,
                          artwork.userId,
                        )}
                      />
                      <AvatarFallback>{artwork.title}</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              )}
            </DialogHeader>
            <div className="relative z-10 flex flex-col items-center gap-2 overflow-y-auto p-2 pt-0">
              {artwork.files.map((url) => (
                <div
                  key={url + Math.random()}
                  className="relative max-h-full w-full"
                >
                  <img
                    src={getImageUrl(url, artwork.userId)}
                    alt={artwork.title}
                    key={url}
                    className="h-full w-full object-contain"
                  />
                  <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-end justify-center p-2">
                    <Link
                      to={getImageUrl(url, artwork.userId)}
                      target="_blank"
                      className="pointer-events-auto"
                    >
                      <EnterFullScreenIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
  'ArtworkLens',
);
