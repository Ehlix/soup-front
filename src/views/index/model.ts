import { getAllArtworks } from '@/lib/api/artworks';
import { subjectList } from '@/lib/static/artworkMeta';
import {
  action,
  reatomResource,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/framework';
import { searchParamsAtom } from '@reatom/url';

export const getArtworks = reatomResource((ctx) => {
  const subject = subjectList.find(
    (s) => s.params === ctx.spy(subjectParams),
  )?.name;
  return getAllArtworks({ subject }, ctx.controller);
}, 'getArtworks').pipe(withDataAtom(), withStatusesAtom());

export const subjectParams = searchParamsAtom.lens('subject');

export const setParams = action((ctx, name: 'subject', value: string) => {
  switch (name) {
    case 'subject':
      searchParamsAtom.set(ctx, 'subject', value);
      break;
  }
}, 'setParams');
