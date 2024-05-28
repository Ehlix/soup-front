import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/api/artworks';

export const UserInfo = (props: { userProfile: UserProfile }) => {
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
};
