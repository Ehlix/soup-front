import { createLazyFileRoute } from '@tanstack/react-router';
import { UserArtworksView } from '@/views/user/views/artworks/UserArtworksView';

export const Route = createLazyFileRoute('/$user/artworks')({
  component: UserArtworksView,
});
