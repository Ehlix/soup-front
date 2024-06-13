import { GeneralView } from '@/views/settings/views/general/GeneralView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_logged/settings/general')({
  component: () => <GeneralView />,
});
