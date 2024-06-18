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

const limit = 29;
const firstLoadDateAtom = atom<number | undefined>(
  undefined,
  'firstLoadDateAtom',
).pipe(withReset());
const offsetAtom = atom(0, 'offsetAtom').pipe(withReset());

export const artworks = reatomResource(async (ctx) => {
  const offset = ctx.spy(offsetAtom);
  const subjectParams = ctx.spy(getSubjectParamsAtom());
  const subject = subjectList.find((s) => s.params === subjectParams)?.name;
  // const date = ctx.get(firstLoadDateAtom);
  const res = await ctx.schedule(() =>
    getAllArtworks({ subject, limit, offset }, ctx.controller),
  );
  return res.data;
}, 'artworks').pipe(
  withDataAtom([], (ctx, data, state) => {
    if (!state || !ctx.get(offsetAtom)) {
      firstLoadDateAtom(ctx, Date.now());
      return data;
    }
    const newState = [...state, ...data];
    return newState;
  }),
  withStatusesAtom(),
);

export const loadMore = action((ctx) => {
  const offset = ctx.get(offsetAtom);
  offsetAtom(ctx, offset + limit + 1);
}, 'loadMore');

export const setParams = action((ctx, name: 'subject', value: string) => {
  switch (name) {
    case 'subject':
      searchParamsAtom.set(ctx, 'subject', value);
      break;
  }
  offsetAtom.reset(ctx);
  firstLoadDateAtom.reset(ctx);
}, 'setParams');

export const getSubjectParamsAtom = () => {
  return searchParamsAtom.lens('subject');
};
