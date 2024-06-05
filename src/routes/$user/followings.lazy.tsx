import { UserFollowingsView } from '@/views/user/views/followings/UserFollowingsView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$user/followings')({
  component: UserFollowingsView,
});
