import { withLocalStorage } from '@reatom/persist-web-storage';
import * as artworks from '@/lib/api/artworks';
import { refreshToken, signOut } from '@/lib/api/auth';
import {
  Ctx,
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

export const setSession = action((ctx, data: AuthResponse | null) => {
  isLoggedAtom(ctx, !!data);
  sessionDataAtom(ctx, data);
}, 'setSession');

export const refreshSession = reatomAsync((ctx) => {
  const isLogged = ctx.get(isLoggedAtom);
  return isLogged ? refreshToken(ctx.controller) : Promise.resolve(null);
}, 'refreshSession');
refreshSession.onFulfill.onCall((ctx, res) => {
  setSession(ctx, res?.data || null);
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
  follow.onSettle.onCall((ctx) => {
    checkFollow.retry(ctx);
  });
  unFollow.onSettle.onCall((ctx) => {
    checkFollow.retry(ctx);
  });
  return { follow, unFollow, checkFollow };
};

export const artworkLikeFactory = (ctx: Ctx, artworkId: string) => {
  const likesCount = atom(0, 'artworkLikeFactory.likesCount');
  const isLiked = atom(false, 'artworkLikeFactory.isLiked');

  const like = reatomAsync((ctx) => {
    likesCount(ctx, ctx.get(likesCount) + 1);
    isLiked(ctx, true);
    return artworks.artworkLike(artworkId, ctx.controller);
  }, 'artworkLike').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );
  like.onFulfill.onCall((ctx, res) => {
    isLiked(ctx, res.data);
    getCount.retry(ctx);
  });
  like.onReject.onCall((ctx) => {
    checkLike.retry(ctx);
    getCount.retry(ctx);
  });
  // like.onSettle.onCall((ctx) => {
  //   getCount.retry(ctx);
  //   checkLike.retry(ctx);
  // });

  const dislike = reatomAsync((ctx) => {
    likesCount(ctx, ctx.get(likesCount) - 1);
    isLiked(ctx, false);
    return artworks.artworkDislike(artworkId, ctx.controller);
  }, 'artworkDislike').pipe(
    withDataAtom(null),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
  );
  dislike.onFulfill.onCall((ctx, res) => {
    isLiked(ctx, !res.data);
    getCount.retry(ctx);
  });
  dislike.onReject.onCall((ctx) => {
    checkLike.retry(ctx);
    getCount.retry(ctx);
  });
  // dislike.onSettle.onCall((ctx) => {
  //   getCount.retry(ctx);
  //   checkLike.retry(ctx);
  // });

  const getCount = reatomAsync((ctx) => {
    return artworks.artworkLikesCount(artworkId, ctx.controller);
  }, 'artworkLikesCount').pipe(
    withDataAtom(0),
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
    withRetry(),
  );
  getCount.onFulfill.onCall((ctx, res) => {
    likesCount(ctx, res.data);
  });

  const checkLike = reatomAsync(async (ctx) => {
    const userId = ctx.get(sessionDataAtom)?.userProfile?.userId;
    if (!userId) return Promise.resolve(false);
    return artworks
      .checkArtworkLike(artworkId, userId, ctx.controller)
      .then((res) => res.data);
  }, 'checkLike').pipe(
    withErrorAtom(),
    withAbort(),
    withStatusesAtom(),
    withRetry(),
  );
  checkLike.onFulfill.onCall((ctx, res) => {
    isLiked(ctx, res);
  });

  checkLike(ctx);
  getCount(ctx);

  return { likesCount, isLiked, like, dislike, checkLike, getCount };
};
