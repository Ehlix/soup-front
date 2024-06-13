import { updateUserProfile } from '@/lib/api/users';
import { refreshSession } from '@/model';
import { reatomAsync, withDataAtom, withStatusesAtom } from '@reatom/framework';

export const updateProfile = reatomAsync(
  (ctx, data: Partial<CreateUserProfileParams>) => {
    return updateUserProfile(data, ctx.controller);
  },
  'updateProfile',
).pipe(withDataAtom(null), withStatusesAtom());
updateProfile.onSettle.onCall((ctx) => {
  refreshSession(ctx);
});
