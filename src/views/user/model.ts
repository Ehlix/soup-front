import { userFactory } from '@/model';

export const { getUserById, userDataAtom, follow, unFollow, checkFollow } =
  userFactory();
