import { NewArtworkViews } from '@/views/newArtwork/NewArtworkViews';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_logged/new-artwork')({
  component: NewArtworkViews,
});
