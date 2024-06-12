import { signIn, signUp } from '@/lib/api/auth';
import { setSession } from '@/model';
import { router } from '@/router';
import { reatomAsync, withStatusesAtom } from '@reatom/framework';

export const login = reatomAsync(
  (ctx, data: SignInParams) => signIn(data, ctx.controller),
  'login',
);
login.onFulfill.onCall((ctx, res) => {
  if (res) {
    setSession(ctx, res.data);
    router.navigate({
      to: '/',
    });
  }
});
login.onReject.onCall((_, error) => console.log(error));

export const register = reatomAsync((ctx, data: SignInParams) => {
  return signUp(data, ctx.controller);
}, 'register').pipe(withStatusesAtom());
register.onFulfill.onCall((ctx, res) => {
  res && setSession(ctx, res.data);
  router.navigate({
    to: '/',
  });
});
register.onReject.onCall((_, error) => console.log(error));
