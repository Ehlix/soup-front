import { withLocalStorage } from '@reatom/persist-web-storage';
import { refreshToken, signOut } from '@/lib/api/auth';
import {
  action,
  atom,
  reatomAsync,
  withAbort,
  withDataAtom,
  withErrorAtom,
  withRetry,
  withStatusesAtom,
} from '@reatom/framework';
import * as files from '@/lib/api/files';
import * as users from '@/lib/api/users';

export const isLoggedAtom = atom(false, 'isLoggedAtom').pipe(
  withLocalStorage('isLogged'),
);

export const sessionDataAtom = atom<AuthResponse | null>(
  null,
  'sessionDataAtom',
).pipe(withLocalStorage('sessionData'));

const setFollows = reatomAsync(async (ctx, userId: string) => {
  const userFollows = users.userFollows(userId, ctx.controller);
  const userFollowers = users.userFollowers(userId, ctx.controller);
  return Promise.all([userFollows, userFollowers]).then((res) => {
    return res[0].data && res[1].data ? [res[0].data, res[1].data] : null;
  });
}, 'setFollows').pipe(withRetry());

export const setSession = action((ctx, data: AuthResponse | null) => {
  isLoggedAtom(ctx, !!data);
  sessionDataAtom(ctx, data);
  if (data?.userProfile) {
    setFollows(ctx, data.userProfile.userId);
  }
}, 'setSession');

export const refreshSession = reatomAsync((ctx) => {
  const isLogged = ctx.get(isLoggedAtom);
  return isLogged ? refreshToken(ctx.controller) : Promise.resolve(null);
}, 'refreshSession');
refreshSession.onFulfill.onCall((ctx, res) => {
  res && setSession(ctx, res.data);
});
refreshSession.onReject.onCall((ctx) => {
  setSession(ctx, null);
});

export const logout = reatomAsync((ctx) => signOut(ctx.controller), 'logout');
logout.onFulfill.onCall((ctx) => {
  setSession(ctx, null);
});

export const uploadImage = reatomAsync((ctx, file: File) => {
  return files.uploadImage(file, ctx.controller);
}, 'uploadImage').pipe(withDataAtom(null), withStatusesAtom());

export const followFabric = () => {
  const follow = reatomAsync((ctx, userId: string) => {
    return users.followUser(userId, ctx.controller);
  }, 'followUser').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );
  follow.onFulfill.onCall((ctx, res) => {
    res && setFollows.retry(ctx);
  });

  const unFollow = reatomAsync((ctx, userId: string) => {
    return users.unFollowUser(userId, ctx.controller);
  }, 'unFollowUser').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );
  unFollow.onFulfill.onCall((ctx, res) => {
    res && setFollows.retry(ctx);
  });

  const checkFollow = reatomAsync(async (ctx, userId: string) => {
    const sessionUserId = ctx.get(sessionDataAtom)?.userProfile?.userId;
    if (!sessionUserId) {
      return null;
    }
    const follows = await ctx.schedule(() =>
      users.userFollows(sessionUserId, ctx.controller),
    );
    return Promise.resolve(follows.data?.some((f) => f.followId === userId));
  }, 'checkFollow').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withStatusesAtom(),
    withRetry(),
  );
  return { follow, unFollow, checkFollow };
};
