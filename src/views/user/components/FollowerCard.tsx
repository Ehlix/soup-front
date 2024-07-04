import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';
import { followFactory, sessionDataAtom } from '@/model';
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';
import * as model from '../model';
import { CheckIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';

type Props = {
  data: FollowResponse;
  mode: 'follower' | 'follow';
};

export const FollowerCard = reatomComponent<Props>(({ ctx, data, mode }) => {
  const sessionUserProfile = ctx.spy(sessionDataAtom)?.userProfile;
  const session = useMemo(() => {
    if (!sessionUserProfile) {
      return null;
    }
    const checkId = mode === 'follower' ? data.followId : data.userId;
    const { checkFollow } = followFactory();
    checkFollow(ctx, checkId);
    return checkFollow;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUserProfile]);
  const isFollow = session && ctx.spy(session.dataAtom);
  const followLoading = session
    ? ctx.spy(session.statusesAtom).isPending
    : false;

  const candidateProfile = data[mode]?.userProfile;
  if (!candidateProfile) return null;
  const isSessionUser = sessionUserProfile?.userId === candidateProfile?.userId;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="size-16">
          <AvatarImage
            src={getImageUrl(candidateProfile.avatar, candidateProfile.userId)}
          />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold capitalize">
            {candidateProfile.name}
          </h1>
          <p className="text-md capitalize text-muted-foreground">
            {candidateProfile.headline}
          </p>
          {session ? (
            !isSessionUser ? (
              isFollow ? (
                <Button
                  disabled={followLoading}
                  onClick={() => model.unFollow(ctx, candidateProfile.userId)}
                  variant="ghost"
                  className="w-full"
                >
                  <CheckIcon className="size-5" /> You follow
                </Button>
              ) : (
                <Button
                  disabled={followLoading}
                  onClick={() => model.follow(ctx, candidateProfile.userId)}
                  className="w-full"
                >
                  Follow
                </Button>
              )
            ) : null
          ) : (
            <Link to="/auth">
              <Button>Follow</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}, 'FollowerCard');
