import { updateUserProfile } from '@/lib/api/users';
import { refreshSession } from '@/model';
import { reatomAsync, withDataAtom, withStatusesAtom } from '@reatom/framework';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const updateProfile = reatomAsync(
  (ctx, data: Partial<CreateUserProfileParams>) => {
    return updateUserProfile(data, ctx.controller);
  },
  'updateProfile',
).pipe(withDataAtom(null), withStatusesAtom());
updateProfile.onSettle.onCall((ctx) => {
  refreshSession(ctx);
});
updateProfile.onFulfill.onCall(() => {
  toast.success('Profile updated');
});
updateProfile.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>).response?.data?.message ||
      'Update failed',
  );
});
