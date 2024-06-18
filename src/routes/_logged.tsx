import * as model from '@/model';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged')({
  beforeLoad: ({ context }) => {
    const ctx = context.reatomCtx;
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
