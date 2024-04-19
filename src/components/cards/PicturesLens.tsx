import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@tanstack/react-router";

export const CardLens = (props: { children: React.ReactNode; card: Res; className?: string }) => {
  return (
    <Dialog>
      <DialogTrigger className={cn("h-full w-full", props.className)}>{props.children}</DialogTrigger>
      <DialogContent className="min-w-[90dvw] p-0">
        <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
          <DialogHeader className=" flex p-2 flex-row items-center gap-2 pr-16">
            <Link to={`/${props.card.id}/pictures/all`}>
              <Avatar>
                <AvatarImage src={props.card.userProfile.avatar} />
                <AvatarFallback delayMs={600}>
                  {props.card.userProfile.name[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="mx-auto flex flex-col">
              <DialogTitle>{props.card.title}</DialogTitle>
              <DialogDescription>{props.card.description}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="relative p-2 pt-0 z-10 flex flex-col items-center gap-2 overflow-y-auto">
            {props.card.urls.map((url) => (
              <div key={url + Math.random()} className="w-full max-h-full">
                <img
                  src={url}
                  alt={props.card.title}
                  key={url}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};