import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Outlet,
  createFileRoute,
  notFound,
  useRouterState,
} from "@tanstack/react-router";
import { cards } from "@/assets/cardsDummy";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Selector = {
  title: string;
  key: string;
};

const pages = [
  { title: "Pictures", key: "pictures" },
  { title: "About", key: "about" },
  { title: "Likes", key: "likes" },
  { title: "Followers", key: "followers" },
  { title: "Following", key: "following" },
];

const folders = [
  { title: "All", key: "all" },
  { title: "Food", key: "213iu231" },
  { title: "Friends", key: "i123h321" },
  { title: "Animals", key: "lkjlj123" },
];

export const Route = createFileRoute("/$user")({
  beforeLoad: async ({ params, location }) => {
    const splitPath = location.pathname.split("/");
    if (!splitPath[2]) {
      window.location.href = `/${params.user}/pictures/all`;
    }
    if (splitPath[2] === "pictures") {
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
  const userPage = location.pathname.split("/")[2];
  const folder = location.pathname.split("/")[3];
  if (!card) return null;
  const changePage = (key: string) => {
    if (userPage === key) return;
    if (key === "pictures") {
      return (window.location.href = `/${params.user}/${key}/${folder ?? "all"}`);
    }
    window.location.href = `/${params.user}/${key}`;
  };
  const changeFolder = (key: string) => {
    if (folder === key) return;
    const folderHasKey = folders.find((folder) => folder.key === key);
    window.location.href = `/${params.user}/${userPage}/${folderHasKey ? key : "all"}`;
  };
  return (
    <div>
      <div className="h-18 flex w-full items-center gap-2 py-2">
        <Avatar>
          <AvatarImage src={cacheCard.userProfile.avatar} />
          <AvatarFallback>: (</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {cacheCard.userProfile.name}
          </h1>
          <p className="text-md capitalize text-muted-foreground">
            {cacheCard.userProfile.headline}
          </p>
        </div>
        <Slash />
        <Selector
          items={pages}
          currentKey={userPage || "/"}
          emit={changePage}
        />
        {userPage === "pictures" && (
          <>
            <Slash />
            <Selector items={folders} currentKey={folder} emit={changeFolder} />
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

function Slash() {
  return <div className="mx-2 h-12 w-0.5 rotate-12 rounded bg-border" />;
}

function Selector<Items extends Selector[]>(props: {
  items: Items;
  currentKey: Items[number]["key"];
  emit?: (key: Items[number]["key"]) => void;
  className?: string;
}) {
  const currentItem = props.items.find((item) => item.key === props.currentKey);
  const filteredItem = props.items.filter(
    (item) => item.key !== props.currentKey,
  );
  return (
    <div className={cn("group relative p-2", props.className)}>
      <h1 className="text-xl font-bold capitalize">{currentItem?.title}</h1>
      <div className="absolute left-0 top-0 z-30 hidden h-fit w-full transition-opacity group-hover:block">
        <div className="mt-12 flex w-fit flex-col gap-1 bg-background p-1">
          {filteredItem.map((item) => (
            <button
              key={item.key}
              className="flex px-2 text-base"
              onClick={() => props.emit?.(item.key)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
