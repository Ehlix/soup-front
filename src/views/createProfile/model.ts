import { createUserProfile } from '@/lib/api/users';
import { refreshSession } from '@/model';
import { router } from '@/router';
import { reatomAsync, withDataAtom, withStatusesAtom } from '@reatom/framework';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const createProfile = reatomAsync(
  (ctx, data: CreateUserProfileParams) =>
    createUserProfile(data, ctx.controller),
  'createProfile',
).pipe(withDataAtom(null), withStatusesAtom());
createProfile.onFulfill.onCall((ctx, res) => {
  if (!res.data) return;
  toast.success('Profile created!');
  refreshSession(ctx);
  router.navigate({
    to: '/',
  });
});
createProfile.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>)?.response?.data?.message ||
      'Registration failed',
  );
});
