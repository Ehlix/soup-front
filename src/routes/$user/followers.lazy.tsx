import { UserFollowersView } from '@/views/user/views/followers/UserFollowersView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$user/followers')({
  component: UserFollowersView,
});
