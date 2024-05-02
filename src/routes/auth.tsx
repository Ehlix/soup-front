import { isLoggedAtom } from '@/model';
import { createCtx } from '@reatom/framework';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const ctx = createCtx();
    if (ctx.get(isLoggedAtom)) {
      throw redirect({
        to: '/',
      });
    }
  },
});
