import { LikesView } from '@/views/user/views/likes/LikesView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$user/likes')({
  component: LikesView,
});
