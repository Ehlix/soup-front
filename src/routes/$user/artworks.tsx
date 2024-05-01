import { createFileRoute } from '@tanstack/react-router';
import { UserArtworksView } from '@/views/user/views/artworks/UserArtworksView';

export const Route = createFileRoute('/$user/artworks')({
  component: UserArtworksView,
});
