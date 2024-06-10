import { reatomComponent } from '@reatom/npm-react';
import { Loading } from '@/components/ui/Loading';
import { FollowerCard } from '../../components/FollowerCard';
import * as model from '../../model';

export const UserFollowersView = reatomComponent(({ ctx }) => {
  const userData = ctx.spy(model.userDataAtom);
  if (!userData) return null;
  const loading = ctx.spy(userData.userFollowers.statusesAtom).isPending;
  if (loading) return <Loading />;
  if (ctx.spy(userData.userFollows.errorAtom)) return <div>Empty</div>;
  const userFollowers = ctx.spy(userData.userFollowers.dataAtom)?.data;
  if (!userFollowers) return null;
  if (userFollowers.length === 0) return <div>Empty</div>;
  return (
    <div className="grid grid-cols-6 gap-2 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {userFollowers.map((item) => (
        <FollowerCard key={item.id} data={item} />
      ))}
    </div>
  );
}, 'UserFollowersView');
