import { AuthView } from '@/views/auth/AuthView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth')({
  component: AuthView,
});
