import * as model from '@/model';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/create-profile')({
  beforeLoad: ({ context }) => {
    const ctx = context.reatomCtx;
    if (
      !ctx.get(model.isLoggedAtom) ||
      ctx.get(model.sessionDataAtom)?.userProfile
    ) {
      throw redirect({
        to: '/',
      });
    }
  },
});
