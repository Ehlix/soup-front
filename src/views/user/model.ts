import { getUserArtworks } from '@/lib/api/artworks';
import { getUserProfile } from '@/lib/api/users';
import {
  action,
  atom,
  reatomResource,
  withDataAtom,
  withErrorAtom,
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

  const userProfile = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() => getUserProfile(userId, ctx.controller));
  }, 'userProfile').pipe(withDataAtom(profileInitState), withErrorAtom());

  const userArtworks = reatomResource(async (ctx) => {
    const userId = ctx.spy(userIdAtom);
    return await ctx.schedule(() =>
      getUserArtworks({ userId }, ctx.controller),
    );
  }, 'userArtworks').pipe(withDataAtom(artworkInitState), withErrorAtom());
  return {
    userProfile,
    userArtworks,
  };
}, 'userDataAtom');

export const setUserId = action((ctx, userId: string) => {
  const prev = ctx.get(userIdAtom);
  if (prev !== userId) {
    userIdAtom(ctx, userId);
    console.log('setUserId', userId);
  }
}, 'setUserId');
