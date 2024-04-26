import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  Outlet,
  createFileRoute,
  notFound,
  useRouterState,
} from '@tanstack/react-router';
import { cards } from '@/lib/cardsDummy';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';

type Selector = {
  title: string;
  key: string;
};

const pages = [
  { title: 'Pictures', key: 'pictures' },
  { title: 'About', key: 'about' },
  { title: 'Likes', key: 'likes' },
  { title: 'Followers', key: 'followers' },
  { title: 'Followings', key: 'followings' },
];

const folders = [
  { title: 'All', key: 'all' },
  { title: 'Foodfsdgsdrghsghgsdrgrgsrdgrds', key: 'food' },
  { title: 'Friends', key: 'friends' },
  { title: 'Animals', key: 'animals' },
];

export const Route = createFileRoute('/$user')({
  beforeLoad: async ({ params, location }) => {
    const splitPath = location.pathname.split('/');
    if (!splitPath[2]) {
      window.location.href = `/${params.user}/pictures/all`;
    }
    if (splitPath[2] === 'pictures') {
      if (!splitPath[3]) {
        window.location.href = `/${params.user}/pictures/all`;
      }
      const folderHasKey = folders.find(
        (folder) => folder.key === splitPath[3],
      );
      if (!folderHasKey) {
        window.location.href = `/${params.user}/pictures/all`;
      }
    }
  },
  loader: async ({ params }) => {
    const card = cards.find((card) => card.id === params.user);
    return card || notFound();
  },
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not found</div>,
  component: UserPage,
});

function UserPage() {
  const card = Route.useLoaderData();
  const cacheCard = useMemo(() => card, [card]) as Res;
  const { location } = useRouterState();
  const params = Route.useParams();
  const userPage = location.pathname.split('/')[2];
  const folder = location.pathname.split('/')[3];
  if (!card) return null;
  const changePage = (key: string) => {
    if (userPage === key) return;
    if (key === 'pictures') {
      return (window.location.href = `/${params.user}/${key}/${folder ?? 'all'}`);
    }
    window.location.href = `/${params.user}/${key}`;
  };
  const changeFolder = (key: string) => {
    if (folder === key) return;
    const folderHasKey = folders.find((folder) => folder.key === key);
    window.location.href = `/${params.user}/${userPage}/${folderHasKey ? key : 'all'}`;
  };
  return (
    <div className="">
      <div className="flex w-full flex-col gap-2 pb-2">
        <UserInfo userProfile={cacheCard.userProfile} />
        <div className="flex h-8 items-center">
          <Slash />
          <Selector
            items={pages}
            currentKey={userPage || '/'}
            emit={changePage}
          />
          {userPage === 'pictures' && (
            <>
              <Slash />
              <Selector
                items={folders}
                currentKey={folder}
                emit={changeFolder}
              />
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function Slash() {
  return <div className="mx-2 h-8 w-0.5 rotate-12 rounded bg-border" />;
}

function Selector<Items extends Selector[]>(props: {
  items: Items;
  currentKey: Items[number]['key'];
  emit?: (key: Items[number]['key']) => void;
  className?: string;
}) {
  const currentItem = props.items.find((item) => item.key === props.currentKey);
  const filteredItem = props.items.filter(
    (item) => item.key !== props.currentKey,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn('flex items-center gap-2 p-2', props.className)}
      >
        <h1 className="text-base font-bold capitalize text-border">
          {currentItem?.title}
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 min-w-44 max-w-80">
        {filteredItem.map((item) => (
          <DropdownMenuItem key={item.key} className="p-0">
            <button
              key={item.key}
              className="flex h-full w-full truncate p-2 text-base"
              onClick={() => props.emit?.(item.key)}
            >
              {item.title}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo(props: { userProfile: UserProfile }) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="size-[4.5rem]">
          <AvatarImage src={props.userProfile.avatar} />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {props.userProfile.name}
          </h1>
          <p className="text-md capitalize text-muted-foreground">
            {props.userProfile.headline}
          </p>
          <p className="text-md text-muted-foreground">myEmail@example.com</p>
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
