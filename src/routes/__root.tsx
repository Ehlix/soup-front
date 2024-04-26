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

function Navigation() {
  return (
    <div className="backdrop-blur-s sticky left-0 top-0 z-50 flex h-12 w-full items-center justify-between gap-2 bg-gradient-to-b  from-background/100 from-10% to-background/80 to-90% bg-blend-overlay">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Search />
      <Link to="/auth" className="[&.active]:font-bold">
        Authorization
      </Link>
      <UserMenu />
    </div>
  );
}

function Search() {
  return (
    <div className=" flex w-full justify-center">
      <Input
        className="w-[4.3rem] max-w-80 rounded-full border-none outline-none transition-all focus:w-full focus:backdrop-blur-md"
        placeholder="Search"
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

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shuding.png" />{' '}
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56">
        <DropdownMenuLabel className="text-center text-lg">
          User Name
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
        <DropdownMenuItem className="cursor-pointer">Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
