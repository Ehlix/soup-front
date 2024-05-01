import { createFileRoute, redirect } from '@tanstack/react-router';
import { UserView } from '@/views/user/UserView';

export const Route = createFileRoute('/$user')({
  beforeLoad: ({ params, location }) => {
    if (location.pathname.split('/').length === 2) {
      throw redirect({ to: `/${params.user}/artworks` });
    }
  },
  component: UserView,
});
