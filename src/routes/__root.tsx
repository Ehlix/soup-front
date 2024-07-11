import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavigationView } from '@/views/navigation/NavigationView';
import { Toaster } from '@/components/ui/sonner';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Home,
});

function Home() {
  return (
    <>
      <div className="flex h-fit min-h-full w-full flex-col p-2 pt-0">
        <NavigationView />
        <div className="flex w-full grow flex-col">
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */}
        <Toaster
          toastOptions={{
            classNames: {
              default: 'bg-border border-none text-base',
              error: 'bg-destructive border-destructive text-green',
              success: 'bg-emerald-300',
              warning: 'bg-orange-300',
              info: 'bg-border',
              title: 'text-background',
            },
          }}
        />
      </div>
    </>
  );
}
