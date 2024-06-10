import { isLoggedAtom, sessionDataAtom } from '@/model';
import { createCtx } from '@reatom/framework';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const ctx = createCtx();
    if (ctx.get(isLoggedAtom)) {
      if (!ctx.get(sessionDataAtom)?.userProfile) {
        throw redirect({
          to: '/create-profile',
        });
      }
      throw redirect({
        to: '/',
      });
    }
  },
});
