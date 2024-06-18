import { SettingsView } from '@/views/settings/SettingsView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_logged/settings')({
  component: SettingsView,
});
