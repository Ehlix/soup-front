import { createFileRoute } from '@tanstack/react-router';
import { IndexView } from '@/views/index/IndexView';

export const Route = createFileRoute('/')({
  component: IndexView,
});
