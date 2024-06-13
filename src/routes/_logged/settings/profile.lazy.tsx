import { ProfileView } from '@/views/settings/views/profile/ProfileView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_logged/settings/profile')({
  component: () => <ProfileView />,
});
