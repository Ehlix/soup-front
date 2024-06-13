import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';
import { Link, Outlet } from '@tanstack/react-router';
import * as model from '@/model';
import { reatomComponent } from '@reatom/npm-react';

export const SettingsView = reatomComponent(({ ctx }) => {
  const userProfile = ctx.spy(model.sessionDataAtom)?.userProfile;
  if (!userProfile) return null;
  const registerData = userProfile.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString()
    : null;
  return (
    <div className="flex h-full grow gap-2">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-[4.5rem]">
          <AvatarImage
            src={getImageUrl(userProfile.avatar, userProfile.userId)}
          />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <h1 className="text-center text-2xl font-bold capitalize">
          {userProfile.name}
        </h1>
        <p className="text-md text-nowrap capitalize text-muted-foreground">
          {'Joined: ' + registerData}
        </p>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-muted-foreground">Settings:</h2>
          <Link
            to="/settings/general"
            default={true}
            className="group relative flex h-full w-fit justify-center truncate p-1 text-base transition-colors [&.active]:text-border"
          >
            General
            <span className="absolute bottom-0 hidden h-0.5 w-full animate-shrink  bg-border group-[&.active]:block" />
          </Link>
          <Link
            to="/settings/profile"
            className="group relative flex h-full w-fit justify-center truncate p-1 text-base transition-colors [&.active]:text-border"
          >
            Profile
            <span className="absolute bottom-0 hidden h-0.5 w-full animate-shrink  bg-border group-[&.active]:block" />
          </Link>
        </div>
      </div>
      <div className="h-full w-full p-2">
        <Outlet />
      </div>
    </div>
  );
}, 'SettingsView');
