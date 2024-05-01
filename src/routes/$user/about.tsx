import { UserAboutView } from '@/views/user/views/about/UserAboutView';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$user/about')({
  component: UserAboutView,
});
