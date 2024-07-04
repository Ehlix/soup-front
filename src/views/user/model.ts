// import { userFactory } from '@/model';
import * as users from '@/lib/api/users';
import * as artworks from '@/lib/api/artworks';
import { followFactory } from '@/model';
import {
  action,
  atom,
  reatomResource,
  withDataAtom,
  withErrorAtom,
  withRetry,
  withStatusesAtom,
} from '@reatom/framework';

// export export const { getUserById, userDataAtom, follow, unFollow, checkFollow } =
//   userFactory();
const artworksLimit = 29;
export const userIdAtom = atom('', 'userIdAtom');

export const sessionUserFollowed = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  return await ctx.schedule(() => checkFollow(ctx, userId));
}, 'sessionUserFollowed').pipe(
  withDataAtom(),
  withErrorAtom(),
  withStatusesAtom(),
  withRetry(),
);

export const userProfile = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  const profile = await ctx.schedule(() =>
    users.getUserProfile(userId, ctx.controller),
  );
  const social = profile.data.social;
  if (social) {
    profile.data.social = JSON.parse(social.toString());
  }
  return profile;
}, 'userProfile').pipe(withDataAtom(), withErrorAtom(), withStatusesAtom());

export const userArtworks = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  const data = {
    userId,
    limit: artworksLimit,
  };
  return await ctx.schedule(() =>
    artworks.getUserArtworks(data, ctx.controller),
  );
}, 'userArtworks').pipe(withDataAtom(), withErrorAtom());

export const userLikesArtworks = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  const data = {
    userId,
    limit: artworksLimit,
  };
  return await ctx.schedule(() =>
    artworks.userArtworksLikes(data, ctx.controller),
  );
}, 'userLikes').pipe(withDataAtom(), withErrorAtom(), withRetry());

export const userFollowers = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  const data = {
    userId,
  };
  return await ctx.schedule(() => users.userFollowers(data, ctx.controller));
}, 'userFollowers').pipe(
  withDataAtom(),
  withErrorAtom(),
  withRetry(),
  withStatusesAtom(),
);

export const userFollows = reatomResource(async (ctx) => {
  const userId = ctx.spy(userIdAtom);
  if (!userId) return null;
  const data = {
    userId,
  };
  return await ctx.schedule(() => users.userFollows(data, ctx.controller));
}, 'userFollows').pipe(
  withDataAtom(),
  withErrorAtom(),
  withRetry(),
  withStatusesAtom(),
);
export const getUserById = action((ctx, userId: string) => {
  // userIdAtom(ctx, null);
  // userDataAtom.reset(ctx);
  userIdAtom(ctx, userId);
}, 'getUserById');

export const { follow, unFollow, checkFollow } = followFactory();
follow.onFulfill.onCall((ctx) => {
  userFollowers.retry(ctx);
  userFollows.retry(ctx);
  sessionUserFollowed.retry(ctx);
});
// follow.onSettle.onCall((ctx) => {
//   checkFollow(ctx, ctx.get(userIdAtom));
// });
unFollow.onFulfill.onCall((ctx) => {
  userFollowers.retry(ctx);
  userFollows.retry(ctx);
  sessionUserFollowed.retry(ctx);
});
// unFollow.onSettle.onCall((ctx) => {
//   checkFollow(ctx, ctx.get(userIdAtom));
// });
