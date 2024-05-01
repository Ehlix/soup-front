import { sessionDataAtom } from '@/model';
import { NewArtworkViews } from '@/views/newArtwork/NewArtworkViews';
import { createCtx } from '@reatom/framework';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/new-artwork')({
  beforeLoad: () => {
    const ctx = createCtx();
    const userProfile = ctx.get(sessionDataAtom)?.userProfile;
    if (!userProfile) {
      throw redirect({
        to: '/create-profile',
      });
    }
  },
  component: NewArtworkViews,
});
