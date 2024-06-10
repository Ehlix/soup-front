import { reatomComponent } from '@reatom/npm-react';
import * as model from '../../model';
import { Loading } from '@/components/ui/Loading';
import { FollowerCard } from '../../components/FollowerCard';

export const UserFollowingsView = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(model.userDataAtom);
  if (!userData) return null;
  const loading = ctx.spy(userData.userFollows.statusesAtom).isPending;
  if (loading) return <Loading />;
  if (ctx.spy(userData.userFollows.errorAtom)) return <div>Empty</div>;
  const userFollows = ctx.spy(userData.userFollows.dataAtom)?.data;
  if (!userFollows) return null;
  if (userFollows.length === 0) return <div>Empty</div>;
  return (
    <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {userFollows.map((item) => (
        <FollowerCard key={item.id} data={item} />
      ))}
    </div>
  );
}, 'UserFollowingsView');
