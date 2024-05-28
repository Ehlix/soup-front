import { UploadIcon } from '@radix-ui/react-icons';
import { reatomComponent } from '@reatom/npm-react';
import { Link } from '@tanstack/react-router';
import { Search } from './components/CreateProfile';
import { UserMenu } from './components/UserMenu';
import * as model from '@/model';

export const NavigationView = reatomComponent(({ ctx }) => {
  return (
    <div className="backdrop-blur-s sticky left-0 top-0 z-50 flex h-fit w-full flex-col bg-gradient-to-b from-background/100 from-10% to-background/80 to-90% bg-blend-overlay">
      <div className="flex h-12 w-full items-center justify-between gap-2">
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
            <Link to="/new-artwork">
              <UploadIcon className="size-5 w-10" />
            </Link>
            <UserMenu />
          </div>
        )}
      </div>
      {ctx.spy(model.isLoggedAtom) &&
        !ctx.spy(model.sessionDataAtom)?.userProfile && (
          <Link
            to="/create-profile"
            className="mb-2 flex h-8 w-full items-center justify-center bg-accent"
          >
            Please complete your profile!
          </Link>
        )}
    </div>
  );
}, 'NavigationView');
