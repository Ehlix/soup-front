import { createLazyFileRoute } from '@tanstack/react-router';
import { IndexView } from '@/views/index/IndexView';

export const Route = createLazyFileRoute('/')({
  component: IndexView,
});
