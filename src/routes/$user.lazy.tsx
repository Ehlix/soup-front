import { createLazyFileRoute } from '@tanstack/react-router';
import { UserView } from '@/views/user/UserView';

export const Route = createLazyFileRoute('/$user')({
  component: UserView,
});
