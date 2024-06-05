import { withLocalStorage } from '@reatom/persist-web-storage';
import * as artworks from '@/lib/api/artworks';
import { refreshToken, signOut } from '@/lib/api/auth';
import {
  action,
  atom,
  reatomAsync,
  reatomResource,
  withAbort,
  withDataAtom,
  withErrorAtom,
  withReset,
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

export const setSession = action((ctx, data: AuthResponse | null) => {
  isLoggedAtom(ctx, !!data);
  sessionDataAtom(ctx, data);
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
}, 'uploadImage').pipe(withDataAtom(null), withStatusesAtom(), withErrorAtom());

export const followFactory = () => {
  const follow = reatomAsync((ctx, userId: string) => {
    return users.followUser(userId, ctx.controller);
  }, 'followUser').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );

  const unFollow = reatomAsync((ctx, userId: string) => {
    return users.unFollowUser(userId, ctx.controller);
  }, 'unFollowUser').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );

  const checkFollow = reatomAsync((ctx, userId: string) => {
    const sessionUserId = ctx.get(sessionDataAtom)?.userProfile?.userId;
    if (!sessionUserId) {
      return Promise.resolve(null);
    }
    return users.checkFollow(sessionUserId, userId, ctx.controller);
  }, 'checkFollow').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withStatusesAtom(),
    withRetry(),
  );
  return { follow, unFollow, checkFollow };
};

export const userFactory = () => {
  const userIdAtom = atom('', 'userFactory.userIdAtom');

  const profileInitState = {
    data: null as UserProfile | null,
    error: null,
  };

  const artworkInitState = {
    data: null as ArtworkResponse[] | null,
    error: null,
  };

  const followInitState = {
    data: null as FollowResponse[] | null,
    error: null,
  };

  const userDataAtom = atom((ctx) => {
    const userId = ctx.spy(userIdAtom);
    if (!userId) return null;
    checkFollow(ctx, userId);

    const userProfile = reatomResource(async (ctx) => {
      const userId = ctx.spy(userIdAtom);
      const profile = await ctx.schedule(() =>
        users.getUserProfile(userId, ctx.controller),
      );
      const social = profile.data.social;
      if (social) {
        profile.data.social = JSON.parse(social.toString());
      }
      return profile;
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
      withDataAtom(followInitState),
      withErrorAtom(),
      withRetry(),
      withStatusesAtom(),
    );

    const userFollows = reatomResource(async (ctx) => {
      const userId = ctx.spy(userIdAtom);
      return await ctx.schedule(() =>
        users.userFollows(userId, ctx.controller),
      );
    }, 'userFollows').pipe(
      withDataAtom(followInitState),
      withErrorAtom(),
      withRetry(),
      withStatusesAtom(),
    );

    return {
      userProfile,
      userArtworks,
      userFollowers,
      userFollows,
    };
  }, 'userDataAtom').pipe(withReset());

  const getUserById = action((ctx, userId: string) => {
    // userIdAtom(ctx, null);
    // userDataAtom.reset(ctx);
    userIdAtom(ctx, userId);
  }, 'userFactory.getUserById');

  const { follow, unFollow, checkFollow } = followFactory();
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

  return { userDataAtom, getUserById, follow, unFollow, checkFollow };
};
