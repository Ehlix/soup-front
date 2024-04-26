import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

type Props = { userWithProfile: UserWithProfile };

export const UserCard = (props: Props) => {
  return (
    <div className="flex items-center gap-2 bg-card p-4">
      <Avatar>
        <AvatarImage src={props.userWithProfile.userProfile.avatar} />
        <AvatarFallback>: (</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold capitalize">
          {props.userWithProfile.userProfile.name}
        </h2>
        <p className="text-md capitalize text-muted-foreground">
          {props.userWithProfile.userProfile.headline}
        </p>
      </div>
    </div>
  );
};
