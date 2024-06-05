import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';
import { followFactory, isLoggedAtom, sessionDataAtom } from '@/model';
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';
import * as model from '../model';
import { CheckIcon } from '@radix-ui/react-icons';

type Props = {
  data: FollowResponse;
};

export const FollowerCard = reatomComponent<Props>(({ ctx, data }) => {
  const isLogged = ctx.spy(isLoggedAtom);
  const session = useMemo(() => {
    if (!isLogged) {
      return null;
    }
    const { checkFollow } = followFactory();
    checkFollow(ctx, data.followId);
    return checkFollow;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);
  const isFollow = session && ctx.spy(session.dataAtom);
  const followLoading = session
    ? ctx.spy(session.statusesAtom).isPending
    : false;

  const isSessionUser =
    ctx.spy(sessionDataAtom)?.userProfile?.userId ===
    data.user.userProfile.userId;
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="size-16">
          <AvatarImage
            src={getImageUrl(
              data.user.userProfile.avatar,
              data.user.userProfile.userId,
            )}
          />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold capitalize">
            {data.user.userProfile.name}
          </h1>
          <p className="text-md capitalize text-muted-foreground">
            {data.user.userProfile.headline}
          </p>
          {session && !isSessionUser ? (
            isFollow ? (
              <Button
                disabled={followLoading}
                onClick={() => model.unFollow(ctx, data.followId)}
                variant="ghost"
                className="w-full"
              >
                <CheckIcon className="size-5" /> You follow
              </Button>
            ) : (
              <Button
                disabled={followLoading}
                onClick={() => model.follow(ctx, data.followId)}
                className="w-full"
              >
                Follow
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}, 'FollowerCard');
