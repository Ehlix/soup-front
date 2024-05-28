import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavigationView } from '@/views/navigation/NavigationView';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Home,
});

function Home() {
  return (
    <>
      <div className=" flex h-fit min-h-full w-full flex-col p-2 pt-0">
        <NavigationView />
        <div className="flex w-full grow flex-col">
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */}
      </div>
    </>
  );
}
