import * as artworks from '@/lib/api/artworks';
import * as users from '@/lib/api/users';
import { followFabric } from '@/model';
import {
  action,
  atom,
  reatomResource,
  withDataAtom,
  withErrorAtom,
  withRetry,
  withStatusesAtom,
} from '@reatom/framework';

const userIdAtom = atom('', 'userIdAtom');

// const userDataAtom = atom(
//   {
//     userProfile: {} as UserProfile,
//     userArtworks: [] as ArtworkResponse[],
//   },
//   'userDataAtom',
// );
const profileInitState = {
  data: null as UserProfile | null,
  error: null,
};

const artworkInitState = {
  data: null as ArtworkResponse[] | null,
  error: null,
};

export const userDataAtom = atom((ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  checkFollow(ctx, userId);

  const userProfile = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() =>
      users.getUserProfile(userId, ctx.controller),
    );
  }, 'userProfile').pipe(
    withDataAtom(profileInitState),
    withErrorAtom(),
    withStatusesAtom(),
  );

  const userArtworks = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() =>
      artworks.getUserArtworks({ userId }, ctx.controller),
    );
  }, 'userArtworks').pipe(withDataAtom(artworkInitState), withErrorAtom());

  const userFollowers = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() =>
      users.userFollowers(userId, ctx.controller),
    );
  }, 'userFollowers').pipe(
    withDataAtom(artworkInitState),
    withErrorAtom(),
    withRetry(),
  );

  const userFollows = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() => users.userFollows(userId, ctx.controller));
  }, 'userFollows').pipe(
    withDataAtom(artworkInitState),
    withErrorAtom(),
    withRetry(),
  );

  return {
    userProfile,
    userArtworks,
    userFollowers,
    userFollows,
  };
}, 'userDataAtom');

export const getUserById = action((ctx, userId: string) => {
  // userIdAtom(ctx, null);
  userIdAtom(ctx, userId);
}, 'getUserById');

export const { follow, unFollow, checkFollow } = followFabric();

follow.onFulfill.onCall((ctx) => {
  ctx.get(userDataAtom)?.userFollowers.retry(ctx);
  ctx.get(userDataAtom)?.userFollows.retry(ctx);
});
follow.onSettle.onCall((ctx) => {
  checkFollow(ctx, ctx.get(userIdAtom));
});
unFollow.onFulfill.onCall((ctx) => {
  ctx.get(userDataAtom)?.userFollowers.retry(ctx);
  ctx.get(userDataAtom)?.userFollows.retry(ctx);
});
unFollow.onSettle.onCall((ctx) => {
  checkFollow(ctx, ctx.get(userIdAtom));
});

// export const updateFollows = action((ctx) => {
//   ctx.get(userDataAtom)?.userFollowers.retry(ctx);
//   ctx.get(userDataAtom)?.userFollows.retry(ctx);
// }, 'updateFollows');
