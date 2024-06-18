import { signIn, signUp } from '@/lib/api/auth';
import { setSession } from '@/model';
import { router } from '@/router';
import { reatomAsync, withStatusesAtom } from '@reatom/framework';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const login = reatomAsync(
  (ctx, data: SignInParams) => signIn(data, ctx.controller),
  'login',
);
login.onFulfill.onCall((ctx, res) => {
  if (res) {
    toast.success('You are logged in!');
    setSession(ctx, res.data);
    router.navigate({
      to: '/',
    });
  }
});
login.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>)?.response?.data?.message ||
      'Login failed',
  );
});

export const register = reatomAsync((ctx, data: SignInParams) => {
  return signUp(data, ctx.controller);
}, 'register').pipe(withStatusesAtom());
register.onFulfill.onCall((ctx, res) => {
  toast.success('You are registered!');
  res && setSession(ctx, res.data);
  router.navigate({
    to: '/',
  });
});
register.onReject.onCall((_, error) => {
  toast.error(
    (error as AxiosError<RejectData>)?.response?.data?.message ||
      'Registration failed',
  );
});
