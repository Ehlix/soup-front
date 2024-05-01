import { getImageUrl } from '@/lib/api/artworks';
import { Button } from '@/components/ui/Button';
import { setUserId, userDataAtom } from '@/views/user/model';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { reatomComponent } from '@reatom/npm-react';
import { Outlet, Link, useParams } from '@tanstack/react-router';
import { useMemo } from 'react';

export const UserView = reatomComponent(({ ctx }) => {
  const { user } = useParams({ from: '/$user' });

  useMemo(() => {
    setUserId(ctx, user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const userData = ctx.spy(userDataAtom);
  if (!userData) return null;
  const isLoading = ctx.spy(userData.userProfile.pendingAtom);
  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }
  if (ctx.spy(userData.userProfile.errorAtom)) {
    return (
      <div>
        <p>not found</p>
      </div>
    );
  }
  const profile = ctx.spy(userData.userProfile.dataAtom).data;
  return (
    <div className="">
      {profile && (
        <div className="flex w-full flex-col gap-2 pb-2">
          <UserInfo userProfile={profile} />
          <div className="flex h-8 items-center">
            <UserNavigation />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}, 'UserView');

// function Slash() {
//   return <div className="mx-2 h-8 w-0.5 rotate-12 rounded bg-border" />;
// }

const UserNavigation = () => {
  const pages = [
    { title: 'Artworks', key: 'artworks' },
    { title: 'About', key: 'about' },
    { title: 'Likes', key: 'likes' },
    { title: 'Followers', key: 'followers' },
    { title: 'Followings', key: 'followings' },
  ];
  return (
    <div className="flex h-full w-full justify-between gap-1">
      {pages.map((item) => (
        <Link
          to={item.key}
          key={item.key}
          default={item.key === 'artworks'}
          className="group relative flex h-full w-fit justify-center truncate p-2 text-base transition-colors [&.active]:text-border"
        >
          {item.title}
          <span className="absolute bottom-0 hidden h-0.5 w-full animate-shrink  bg-border group-[&.active]:block" />
        </Link>
      ))}
    </div>
  );
};

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

function UserInfo(props: { userProfile: UserProfile }) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="size-[4.5rem]">
          <AvatarImage
            src={getImageUrl(
              props.userProfile.avatar,
              props.userProfile.userId,
            )}
          />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {props.userProfile.name}
          </h1>
          <p className="text-md capitalize text-muted-foreground">
            {props.userProfile.headline}
          </p>
          <p className="text-md text-muted-foreground">
            {props.userProfile.social?.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="w-full">
            Follow
          </Button>
          <div className="w-full">
            <h1 className="text-2xl font-bold">100</h1>
            <p className="text-md capitalize text-muted-foreground">
              Followers
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold">50</h1>
            <p className="text-md capitalize text-muted-foreground">
              Followings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
