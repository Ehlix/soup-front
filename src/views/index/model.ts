import { getAllArtworks } from '@/lib/api/artworks';
import { subjectList } from '@/lib/static/artworkMeta';
import {
  action,
  atom,
  reatomResource,
  withDataAtom,
  withReset,
  withStatusesAtom,
} from '@reatom/framework';
import { searchParamsAtom } from '@reatom/url';

const artworksLimit = 29;
const firstLoadDateAtom = atom<number | undefined>(
  undefined,
  'firstLoadDateAtom',
).pipe(withReset());
const artworksOffsetAtom = atom(0, 'offsetAtom').pipe(withReset());

export const artworks = reatomResource(async (ctx) => {
  const offset = ctx.spy(artworksOffsetAtom);
  const subjectParams = ctx.spy(getSubjectParamsAtom());
  const subject = subjectList.find((s) => s.params === subjectParams)?.name;
  // const date = ctx.get(firstLoadDateAtom);
  const res = await ctx.schedule(() =>
    getAllArtworks({ subject, limit: artworksLimit, offset }, ctx.controller),
  );
  return res.data;
}, 'artworks').pipe(
  withDataAtom([], (ctx, data, state) => {
    if (!state || !ctx.get(artworksOffsetAtom)) {
      firstLoadDateAtom(ctx, Date.now());
      return data;
    }
    const newState = [...state, ...data];
    return newState;
  }),
  withStatusesAtom(),
);

export const loadMoreArtworks = action((ctx) => {
  const offset = ctx.get(artworksOffsetAtom);
  artworksOffsetAtom(ctx, offset + artworksLimit + 1);
}, 'loadMoreArtworks');

export const setParams = action((ctx, name: 'subject', value: string) => {
  switch (name) {
    case 'subject':
      searchParamsAtom.set(ctx, 'subject', value);
      break;
  }
  artworksOffsetAtom.reset(ctx);
  firstLoadDateAtom.reset(ctx);
}, 'setParams');

export const getSubjectParamsAtom = () => {
  return searchParamsAtom.lens('subject');
};
