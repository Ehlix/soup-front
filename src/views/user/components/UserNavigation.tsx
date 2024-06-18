import { Link } from '@tanstack/react-router';

const pages = [
  { title: 'Artworks', key: '/$user/artworks' },
  { title: 'About', key: '/$user/about' },
  { title: 'Likes', key: '/$user/likes' },
  { title: 'Followers', key: '/$user/followers' },
  { title: 'Followings', key: '/$user/followings' },
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
          <span className="absolute bottom-0 hidden h-0.5 w-full animate-shrink bg-border group-[&.active]:block" />
        </Link>
      ))}
    </div>
  );
};
