import { createArtwork } from '@/lib/api/artworks';
import { subjectList } from '@/lib/static/artworkMeta';
import {
  action,
  atom,
  debounce,
  reatomAsync,
  withStatusesAtom,
} from '@reatom/framework';

export const UploadNewArtwork = reatomAsync(
  (ctx, data: CreateArtworkParams) => createArtwork(data, ctx.controller),
  'UploadNewArtwork',
).pipe(withStatusesAtom());

const currentSubject = atom('', 'currentSubject');

export const currentSubjectDescription = atom((ctx) => {
  const subject = ctx.spy(currentSubject);
  if (!subject) return 'No selected subject';
  const description = subjectList.find((s) => s.name === subject)?.description;
  return description || 'No selected subject';
}, 'currentSubjectDescription').pipe(debounce(200));

export const setCurrentSubject = action((ctx, subject: string) => {
  currentSubject(ctx, subject);
}, 'setCurrentSubject');
