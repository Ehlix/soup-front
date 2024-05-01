import { withLocalStorage } from '@reatom/persist-web-storage';
import { refreshToken, signOut } from '@/lib/api/auth';
import { action, atom, reatomAsync } from '@reatom/framework';

export const isLoggedAtom = atom(false, 'isLoggedAtom').pipe(
  withLocalStorage('isLogged'),
);

export const sessionDataAtom = atom<AuthResponse | null>(
  null,
  'sessionDataAtom',
).pipe(withLocalStorage('sessionData'));

export const setSession = action((ctx, data: AuthResponse | null) => {
  isLoggedAtom(ctx, !!data);
  sessionDataAtom(ctx, data);
}, 'setSession');

export const refreshSession = reatomAsync((ctx) => {
  const isLogged = ctx.get(isLoggedAtom);
  return isLogged ? refreshToken(ctx.controller) : Promise.resolve(null);
}, 'refreshSession');
refreshSession.onFulfill.onCall((ctx, res) => {
  res && setSession(ctx, res.data);
});
refreshSession.onReject.onCall((ctx) => {
  setSession(ctx, null);
});

export const logout = reatomAsync((ctx) => signOut(ctx.controller), 'logout');
logout.onFulfill.onCall((ctx) => {
  setSession(ctx, null);
});
