import { NewArtworkView } from '@/views/newArtwork/NewArtworkView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_logged/new-artwork')({
  component: NewArtworkView,
});
