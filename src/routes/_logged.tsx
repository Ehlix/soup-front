import * as model from '@/model';
import { createCtx } from '@reatom/framework';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged')({
  beforeLoad: () => {
    const ctx = createCtx();
    if (!ctx.get(model.isLoggedAtom)) {
      throw redirect({
        to: '/auth',
      });
    }
    if (!ctx.get(model.sessionDataAtom)?.userProfile) {
      throw redirect({
        to: '/create-profile',
      });
    }
  },
});
