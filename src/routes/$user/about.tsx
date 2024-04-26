import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$user/about')({
  component: () => <div>About</div>,
});
