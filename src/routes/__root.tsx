import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { reatomComponent } from '@reatom/npm-react';
import { getImageUrl } from '@/lib/api/artworks';
import * as model from '@/model';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Home,
});

function Home() {
  return (
    <>
      <div className=" flex h-fit min-h-full w-full flex-col p-2 pt-0">
        <Navigation />
        <div className="flex w-full grow flex-col">
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */}
      </div>
    </>
  );
}

const Navigation = reatomComponent(({ ctx }) => {
  return (
    <div className="backdrop-blur-s sticky left-0 top-0 z-50 flex h-12 w-full items-center justify-between gap-2 bg-gradient-to-b  from-background/100 from-10% to-background/80 to-90% bg-blend-overlay">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/create-profile" className="[&.active]:font-bold">
        11
      </Link>
      <Search />
      {!ctx.spy(model.isLoggedAtom) ? (
        <Link to="/auth" className="[&.active]:font-bold">
          Authorization
        </Link>
      ) : (
        <div className="flex gap-1">
          <Link to="/new-artwork">Create new artwork</Link>
          <UserMenu />
        </div>
      )}
    </div>
  );
}, 'Navigation');

function Search() {
  const [value, setValue] = useState('');
  return (
    <div className="relative flex w-full justify-center">
      <Input
        className={cn(
          'peer max-w-80 rounded-full outline-none transition-all placeholder-shown:opacity-0 focus:w-full focus:opacity-100 focus:backdrop-blur-md',
          {
            'w-[4.3rem] border-none opacity-0': !value,
          },
        )}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
      <MagnifyingGlassIcon
        className={cn(
          'pointer-events-none absolute top-2 size-5 text-muted-foreground  transition-opacity peer-focus:opacity-0',
          {
            'opacity-0': value,
          },
        )}
      />
    </div>
  );
}

const userMenuItems = [
  {
    title: 'Create new artwork',
    key: '/new-artwork',
  },
  {
    title: 'My artworks',
    key: '/my-artworks',
  },
  {
    title: 'Favorites',
    key: '/favorites',
  },
];

const UserMenu = reatomComponent(({ ctx }) => {
  const userProfile = ctx.spy(model.sessionDataAtom)?.userProfile;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="size-8">
          <AvatarImage
            src={getImageUrl(userProfile?.avatar, userProfile?.userId)}
          />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56">
        <DropdownMenuLabel className="text-center text-lg">
          {userProfile?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenuItems.map((item) => (
          <DropdownMenuItem key={item.key} className="p-0">
            <Link to={item.key} className="h-full w-full p-2">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => model.logout(ctx)}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}, 'UserMenu');
