import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='flex flex-col p-2 w-full h-full'>
        <div className="flex items-center gap-2 min-h-10">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </div>
    </>
  ),
})
