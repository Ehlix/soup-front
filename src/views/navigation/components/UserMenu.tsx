import { getImageUrl } from '@/lib/api/artworks';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { reatomComponent } from '@reatom/npm-react';
import { Link } from '@tanstack/react-router';
import * as model from '@/model';
import { useMemo } from 'react';

export const UserMenu = reatomComponent(({ ctx }) => {
  const userProfile = ctx.spy(model.sessionDataAtom)?.userProfile;

  const userMenuItems = useMemo(() => {
    return [
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
        key: `/${userProfile?.site}/likes`,
      },
      {
        title: 'Settings',
        key: '/settings/general',
      },
    ];
  }, [userProfile?.site]);
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
        <DropdownMenuLabel>
          <Link
            to={`/${userProfile?.site}`}
            className="text-lg hover:text-foreground/85"
          >
            <h2>{userProfile?.name}</h2>
          </Link>
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
          <span className="text-accent">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}, 'UserMenu');
