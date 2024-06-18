import { updateLoginData } from '@/lib/api/users';
import { refreshSession, sessionDataAtom } from '@/model';
import { reatomAsync, withDataAtom, withStatusesAtom } from '@reatom/framework';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const updateGeneral = reatomAsync((ctx, data: Partial<SignInParams>) => {
  const sessionData = ctx.get(sessionDataAtom);
  if (!data.email || (sessionData?.email === data.email && !data.password)) {
    return Promise.resolve(null);
  }
  if (!data.password) {
    delete data.password;
  }
  if (!data.email || sessionData?.email === data.email) {
    delete data.email;
  }
  return updateLoginData(data, ctx.controller);
}, 'updateGeneral').pipe(withDataAtom(null), withStatusesAtom());
updateGeneral.onSettle.onCall((ctx) => {
  refreshSession(ctx);
});
updateGeneral.onFulfill.onCall(() => {
  toast.success('General updated');
});
updateGeneral.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>).response?.data.message || 'Update failed',
  );
});
