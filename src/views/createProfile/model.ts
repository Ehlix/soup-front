import { createUserProfile } from '@/lib/api/users';
import { refreshSession } from '@/model';
import { router } from '@/router';
import { reatomAsync, withDataAtom, withStatusesAtom } from '@reatom/framework';

export const createProfile = reatomAsync(
  (ctx, data: CreateUserProfileParams) =>
    createUserProfile(data, ctx.controller),
  'createProfile',
).pipe(withDataAtom(null), withStatusesAtom());
createProfile.onFulfill.onCall((ctx, res) => {
  if (!res.data) return;
  refreshSession(ctx);
  router.navigate({
    to: '/',
  });
});
