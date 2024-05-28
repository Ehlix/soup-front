import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProfileSchema, SocialSchema } from '../validation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/api/artworks';
import {
  EnvelopeOpenIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  Link1Icon,
} from '@radix-ui/react-icons';
import { useState, type MouseEvent } from 'react';

export const Preview = (props: {
  onClick: () => Promise<boolean>;
  profile: ProfileSchema;
  social: SocialSchema;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const openHandler = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const open = await props.onClick();
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={openHandler}
        className={cn('w-32', props.className)}
      >
        {'Preview'}
      </DialogTrigger>
      <DialogContent className="min-h-[10dvh] min-w-[90dvw] p-4 pb-0">
        <div className="bg-mc-1 grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] rounded">
          <DialogHeader className="mb-4 flex flex-row items-center gap-2 pr-16">
            <div>
              <Avatar className="size-20">
                <AvatarImage src={getImageUrl(props.profile.avatar)} />
                <AvatarFallback />
              </Avatar>
            </div>
            <div className="flex flex-col">
              <DialogTitle className="capitalize">
                {props.profile.name}
              </DialogTitle>
              <DialogDescription>{props.profile.headline}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="mb-4 flex min-h-0 flex-wrap justify-around gap-2">
            {props.social.website && (
              <a href={props.social.website} target="_blank" rel="noreferrer">
                <Link1Icon className="size-5" /> {props.social.website}
              </a>
            )}
            {props.social.publicEmail && (
              <a href={`mailto:${props.social.publicEmail}`} rel="noreferrer">
                <EnvelopeOpenIcon className="size-5" />{' '}
                {props.social.publicEmail}
              </a>
            )}
            {props.social.twitter && (
              <a
                href={`https://twitter.com/${props.social.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterLogoIcon className="size-5" />
              </a>
            )}
            {props.social.instagram && (
              <a
                href={`https://instagram.com/${props.social.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramLogoIcon className="size-5" />
              </a>
            )}
            {props.social.linkedin && (
              <a
                href={`https://linkedin.com/${props.social.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInLogoIcon className="size-5" />
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
