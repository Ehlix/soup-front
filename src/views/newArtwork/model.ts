import { createArtwork } from '@/lib/api/artworks';
import { subjectList } from '@/lib/static/artworkMeta';
import { sessionDataAtom } from '@/model';
import { router } from '@/router';
import {
  action,
  atom,
  debounce,
  reatomAsync,
  withStatusesAtom,
} from '@reatom/framework';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const uploadNewArtwork = reatomAsync(
  (ctx, data: CreateArtworkParams) => createArtwork(data, ctx.controller),
  'UploadNewArtwork',
).pipe(withStatusesAtom());
uploadNewArtwork.onFulfill.onCall((ctx) => {
  toast.success('Artwork created!');
  const site = ctx.get(sessionDataAtom)?.userProfile?.site;
  site &&
    router.navigate({
      to: `/${site}/artworks`,
    });
});
uploadNewArtwork.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>)?.response?.data?.message ||
      'Upload failed',
  );
});

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
