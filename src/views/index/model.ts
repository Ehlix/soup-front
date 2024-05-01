import { getAllArtworks } from '@/lib/api/artworks';
import {
  reatomResource,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/framework';

const initState = { data: [] as ArtworkResponse[], loading: false };
export const getArtworks = reatomResource(
  (ctx) => getAllArtworks({}, ctx.controller),
  'getArtworks',
).pipe(withDataAtom(initState), withStatusesAtom());
