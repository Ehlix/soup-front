import { getAllArtworks } from '@/lib/api/artworks';
import {
  reatomResource,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/framework';

export const getArtworks = reatomResource(
  (ctx) => getAllArtworks({}, ctx.controller),
  'getArtworks',
).pipe(withDataAtom(), withStatusesAtom());
