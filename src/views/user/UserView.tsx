import { getUserById, userProfile } from '@/views/user/model';
import { reatomComponent } from '@reatom/npm-react';
import { Outlet, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { UserInfo } from './components/UserInfo';
import { UserNavigation } from './components/UserNavigation';
import { Loading } from '@/components/ui/Loading';
import { Notfound } from '@/components/ui/Notfound';

export const UserView = reatomComponent(({ ctx }) => {
  const { user } = useParams({ from: '/$user' });

  useEffect(() => {
    getUserById(ctx, user);
    return () => {
      getUserById(ctx, '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const isLoading = ctx.spy(userProfile.statusesAtom).isPending;
  if (isLoading) {
    return <Loading />;
  }
  if (ctx.spy(userProfile.errorAtom)) {
    return <Notfound />;
  }
  return (
    <div className="">
      <div className="flex w-full flex-col gap-2 pb-2">
        <UserInfo />
        <div className="flex h-8 items-center">
          <UserNavigation />
        </div>
      </div>
      <Outlet />
    </div>
  );
}, 'UserView');

// function Slash() {
//   return <div className="mx-2 h-8 w-0.5 rotate-12 rounded bg-border" />;
// }

// function Selector<Items extends Selector[]>(props: {
//   items: Items;
//   currentKey: Items[number]['key'];
//   emit?: (key: Items[number]['key']) => void;
//   className?: string;
// }) {
//   const currentItem = props.items.find((item) => item.key === props.currentKey);
//   const filteredItem = props.items.filter(
//     (item) => item.key !== props.currentKey,
//   );
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         className={cn('flex items-center gap-2 p-2', props.className)}
//       >
//         <h1 className="text-base font-bold capitalize text-border">
//           {currentItem?.title}
//         </h1>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="ml-4 min-w-44 max-w-80">
//         {filteredItem.map((item) => (
//           <DropdownMenuItem key={item.key} className="p-0">
//             <button
//               key={item.key}
//               className="flex h-full w-full truncate p-2 text-base"
//               onClick={() => props.emit?.(item.key)}
//             >
//               {item.title}
//             </button>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
