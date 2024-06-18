import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { Ctx } from '@reatom/framework';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // defaultPreloadStaleTime: 0,
  // defaultErrorComponent: ({ error }) => 'error',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface RouteContext {
    reatomCtx: Ctx;
  }
}
