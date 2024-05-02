import { UserAboutView } from '@/views/user/views/about/UserAboutView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$user/about')({
  component: UserAboutView,
});
