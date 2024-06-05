import { Link } from '@tanstack/react-router';

const pages = [
  { title: 'Artworks', key: 'artworks' },
  { title: 'About', key: 'about' },
  { title: 'Likes', key: 'likes' },
  { title: 'Followers', key: 'followers' },
  { title: 'Followings', key: 'followings' },
];

export const UserNavigation = () => {
  return (
    <div className="flex h-full w-full justify-between gap-1">
      {pages.map((item) => (
        <Link
          to={item.key}
          key={item.key}
          default={item.key === 'artworks'}
          className="group relative flex h-full w-fit justify-center truncate p-2 text-base transition-colors [&.active]:text-border"
        >
          {item.title}
          <span className="absolute bottom-0 hidden h-0.5 w-full animate-shrink  bg-border group-[&.active]:block" />
        </Link>
      ))}
    </div>
  );
};
