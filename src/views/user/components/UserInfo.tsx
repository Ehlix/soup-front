import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';
import { reatomComponent } from '@reatom/npm-react';
import * as model from '../model';
import { sessionDataAtom } from '@/model';
import { CheckIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';

export const UserInfo = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(model.userDataAtom);
  if (!userData) return null;
  const userProfile = ctx.spy(userData.userProfile.dataAtom)?.data;
  if (!userProfile) return null;
  const userFollowers = ctx.spy(userData.userFollowers.dataAtom)?.data;
  const userFollows = ctx.spy(userData.userFollows.dataAtom)?.data;
  if (!userFollowers || !userFollows) return null;
  const isFollowed = ctx.spy(model.checkFollow.dataAtom);
  const sessionUserProfile = ctx.spy(sessionDataAtom)?.userProfile;
  const isCurrentUserPage = sessionUserProfile?.userId === userProfile.userId;
  const followLoading = ctx.spy(model.checkFollow.statusesAtom).isPending;
  return (
    <div className="flex justify-between gap-2">
      <div className="flex w-full items-center gap-2">
        <Avatar className="size-[4.5rem]">
          <AvatarImage
            src={getImageUrl(userProfile.avatar, userProfile.userId)}
          />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold capitalize">{userProfile.name}</h1>
          <p className="text-md capitalize text-muted-foreground">
            {userProfile.headline}
          </p>
          <p className="text-md text-muted-foreground">
            {userProfile.social?.publicEmail}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-end gap-2 text-center">
        {sessionUserProfile ? (
          isCurrentUserPage ? null : isFollowed ? (
            <Button
              disabled={followLoading}
              variant="ghost"
              className=""
              onClick={() => model.unFollow(ctx, userProfile.userId)}
            >
              <CheckIcon className="size-5" /> You follow
            </Button>
          ) : (
            <Button
              disabled={followLoading}
              className=""
              onClick={() => model.follow(ctx, userProfile.userId)}
            >
              Follow
            </Button>
          )
        ) : (
          <Link to="/auth">
            <Button>Follow</Button>
          </Link>
        )}
        <div className="ml-2 flex items-center gap-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold">{userFollowers.length}</h1>
            <p className="text-md capitalize text-muted-foreground">
              Followers
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold">{userFollows.length}</h1>
            <p className="text-md capitalize text-muted-foreground">
              Followings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}, 'UserInfo');
