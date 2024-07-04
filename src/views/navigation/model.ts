import { searchProfile } from '@/lib/api/users';
import {
  action,
  atom,
  reatomResource,
  sleep,
  withDataAtom,
  withRetry,
} from '@reatom/framework';

export const searchValue = atom('', 'searchValue');

export const changeSearchValue = action((ctx, value: string) => {
  searchValue(ctx, value);
}, 'changeSearchValue');

export const searchResource = reatomResource(async (ctx) => {
  const value = ctx.spy(searchValue);
  if (!value) return [];
  await ctx.schedule(() => sleep(333));
  const data = {
    username: value,
  };
  const res = await ctx.schedule(() => searchProfile(data, ctx.controller));
  return res.data;
}, 'searchResource').pipe(withDataAtom(), withRetry());
