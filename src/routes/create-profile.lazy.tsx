import { CreateProfileView } from '@/views/createProfile/CreateProfileView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/create-profile')({
  component: CreateProfileView,
});
