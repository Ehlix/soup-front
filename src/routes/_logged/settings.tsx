import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged/settings')({
  beforeLoad: ({ location }) => {
    if (location.pathname.split('/').length === 2) {
      throw redirect({ to: `/settings/general` });
    }
  },
});
