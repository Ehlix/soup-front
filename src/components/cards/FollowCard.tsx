import { followFactory, sessionDataAtom } from '@/model';
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';
import { Button } from '../ui/Button';
import { CheckIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';

type Props = {
  followId: string;
};

export const FollowCard = reatomComponent<Props>(({ ctx, followId }) => {
  const sessionDataProfile = ctx.spy(sessionDataAtom)?.userProfile;
  const isMe = sessionDataProfile?.userId === followId;
  if (isMe) {
    return null;
  }
  const followModel = useMemo(() => {
    if (!sessionDataProfile) {
      return null;
    }
    const model = followFactory();
    model.checkFollow(ctx, followId);
    return model;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionDataProfile]);
  const isFollow = followModel && ctx.spy(followModel.checkFollow.dataAtom);
  const followLoading = followModel
    ? ctx.spy(followModel.checkFollow.statusesAtom).isPending
    : false;
  return (
    <div>
      {followModel ? (
        isFollow ? (
          <Button
            disabled={followLoading}
            onClick={() => followModel.unFollow(ctx, followId)}
            variant="ghost"
            className="h-7 w-full"
          >
            <CheckIcon className="size-5" /> You follow
          </Button>
        ) : (
          <Button
            disabled={followLoading}
            onClick={() => followModel.follow(ctx, followId)}
            className="h-7 w-full"
          >
            Follow
          </Button>
        )
      ) : (
        <Link to="/auth">
          <Button className="h-7 w-full">Follow</Button>
        </Link>
      )}
    </div>
  );
}, 'FollowCard');
