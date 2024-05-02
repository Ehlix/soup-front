import * as model from '@/model';
import { createCtx } from '@reatom/framework';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/create-profile')({
  beforeLoad: () => {
    const ctx = createCtx();
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
