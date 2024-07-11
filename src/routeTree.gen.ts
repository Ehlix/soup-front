/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router';

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as CreateProfileImport } from './routes/create-profile';
import { Route as AuthImport } from './routes/auth';
import { Route as LoggedImport } from './routes/_logged';
import { Route as UserImport } from './routes/$user';
import { Route as LoggedSettingsImport } from './routes/_logged/settings';

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')();
const LoggedNewArtworkLazyImport = createFileRoute('/_logged/new-artwork')();
const UserLikesLazyImport = createFileRoute('/$user/likes')();
const UserFollowingsLazyImport = createFileRoute('/$user/followings')();
const UserFollowersLazyImport = createFileRoute('/$user/followers')();
const UserArtworksLazyImport = createFileRoute('/$user/artworks')();
const UserAboutLazyImport = createFileRoute('/$user/about')();
const LoggedSettingsProfileLazyImport = createFileRoute(
  '/_logged/settings/profile',
)();
const LoggedSettingsGeneralLazyImport = createFileRoute(
  '/_logged/settings/general',
)();

// Create/Update Routes

const CreateProfileRoute = CreateProfileImport.update({
  path: '/create-profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/create-profile.lazy').then((d) => d.Route),
);

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth.lazy').then((d) => d.Route));

const LoggedRoute = LoggedImport.update({
  id: '/_logged',
  getParentRoute: () => rootRoute,
} as any);

const UserRoute = UserImport.update({
  path: '/$user',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/$user.lazy').then((d) => d.Route));

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route));

const LoggedNewArtworkLazyRoute = LoggedNewArtworkLazyImport.update({
  path: '/new-artwork',
  getParentRoute: () => LoggedRoute,
} as any).lazy(() =>
  import('./routes/_logged/new-artwork.lazy').then((d) => d.Route),
);

const UserLikesLazyRoute = UserLikesLazyImport.update({
  path: '/likes',
  getParentRoute: () => UserRoute,
} as any).lazy(() => import('./routes/$user/likes.lazy').then((d) => d.Route));

const UserFollowingsLazyRoute = UserFollowingsLazyImport.update({
  path: '/followings',
  getParentRoute: () => UserRoute,
} as any).lazy(() =>
  import('./routes/$user/followings.lazy').then((d) => d.Route),
);

const UserFollowersLazyRoute = UserFollowersLazyImport.update({
  path: '/followers',
  getParentRoute: () => UserRoute,
} as any).lazy(() =>
  import('./routes/$user/followers.lazy').then((d) => d.Route),
);

const UserArtworksLazyRoute = UserArtworksLazyImport.update({
  path: '/artworks',
  getParentRoute: () => UserRoute,
} as any).lazy(() =>
  import('./routes/$user/artworks.lazy').then((d) => d.Route),
);

const UserAboutLazyRoute = UserAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => UserRoute,
} as any).lazy(() => import('./routes/$user/about.lazy').then((d) => d.Route));

const LoggedSettingsRoute = LoggedSettingsImport.update({
  path: '/settings',
  getParentRoute: () => LoggedRoute,
} as any).lazy(() =>
  import('./routes/_logged/settings.lazy').then((d) => d.Route),
);

const LoggedSettingsProfileLazyRoute = LoggedSettingsProfileLazyImport.update({
  path: '/profile',
  getParentRoute: () => LoggedSettingsRoute,
} as any).lazy(() =>
  import('./routes/_logged/settings/profile.lazy').then((d) => d.Route),
);

const LoggedSettingsGeneralLazyRoute = LoggedSettingsGeneralLazyImport.update({
  path: '/general',
  getParentRoute: () => LoggedSettingsRoute,
} as any).lazy(() =>
  import('./routes/_logged/settings/general.lazy').then((d) => d.Route),
);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/$user': {
      id: '/$user';
      path: '/$user';
      fullPath: '/$user';
      preLoaderRoute: typeof UserImport;
      parentRoute: typeof rootRoute;
    };
    '/_logged': {
      id: '/_logged';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof LoggedImport;
      parentRoute: typeof rootRoute;
    };
    '/auth': {
      id: '/auth';
      path: '/auth';
      fullPath: '/auth';
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    '/create-profile': {
      id: '/create-profile';
      path: '/create-profile';
      fullPath: '/create-profile';
      preLoaderRoute: typeof CreateProfileImport;
      parentRoute: typeof rootRoute;
    };
    '/_logged/settings': {
      id: '/_logged/settings';
      path: '/settings';
      fullPath: '/settings';
      preLoaderRoute: typeof LoggedSettingsImport;
      parentRoute: typeof LoggedImport;
    };
    '/$user/about': {
      id: '/$user/about';
      path: '/about';
      fullPath: '/$user/about';
      preLoaderRoute: typeof UserAboutLazyImport;
      parentRoute: typeof UserImport;
    };
    '/$user/artworks': {
      id: '/$user/artworks';
      path: '/artworks';
      fullPath: '/$user/artworks';
      preLoaderRoute: typeof UserArtworksLazyImport;
      parentRoute: typeof UserImport;
    };
    '/$user/followers': {
      id: '/$user/followers';
      path: '/followers';
      fullPath: '/$user/followers';
      preLoaderRoute: typeof UserFollowersLazyImport;
      parentRoute: typeof UserImport;
    };
    '/$user/followings': {
      id: '/$user/followings';
      path: '/followings';
      fullPath: '/$user/followings';
      preLoaderRoute: typeof UserFollowingsLazyImport;
      parentRoute: typeof UserImport;
    };
    '/$user/likes': {
      id: '/$user/likes';
      path: '/likes';
      fullPath: '/$user/likes';
      preLoaderRoute: typeof UserLikesLazyImport;
      parentRoute: typeof UserImport;
    };
    '/_logged/new-artwork': {
      id: '/_logged/new-artwork';
      path: '/new-artwork';
      fullPath: '/new-artwork';
      preLoaderRoute: typeof LoggedNewArtworkLazyImport;
      parentRoute: typeof LoggedImport;
    };
    '/_logged/settings/general': {
      id: '/_logged/settings/general';
      path: '/general';
      fullPath: '/settings/general';
      preLoaderRoute: typeof LoggedSettingsGeneralLazyImport;
      parentRoute: typeof LoggedSettingsImport;
    };
    '/_logged/settings/profile': {
      id: '/_logged/settings/profile';
      path: '/profile';
      fullPath: '/settings/profile';
      preLoaderRoute: typeof LoggedSettingsProfileLazyImport;
      parentRoute: typeof LoggedSettingsImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  UserRoute: UserRoute.addChildren({
    UserAboutLazyRoute,
    UserArtworksLazyRoute,
    UserFollowersLazyRoute,
    UserFollowingsLazyRoute,
    UserLikesLazyRoute,
  }),
  LoggedRoute: LoggedRoute.addChildren({
    LoggedSettingsRoute: LoggedSettingsRoute.addChildren({
      LoggedSettingsGeneralLazyRoute,
      LoggedSettingsProfileLazyRoute,
    }),
    LoggedNewArtworkLazyRoute,
  }),
  AuthRoute,
  CreateProfileRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$user",
        "/_logged",
        "/auth",
        "/create-profile"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/$user": {
      "filePath": "$user.tsx",
      "children": [
        "/$user/about",
        "/$user/artworks",
        "/$user/followers",
        "/$user/followings",
        "/$user/likes"
      ]
    },
    "/_logged": {
      "filePath": "_logged.tsx",
      "children": [
        "/_logged/settings",
        "/_logged/new-artwork"
      ]
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/create-profile": {
      "filePath": "create-profile.tsx"
    },
    "/_logged/settings": {
      "filePath": "_logged/settings.tsx",
      "parent": "/_logged",
      "children": [
        "/_logged/settings/general",
        "/_logged/settings/profile"
      ]
    },
    "/$user/about": {
      "filePath": "$user/about.lazy.tsx",
      "parent": "/$user"
    },
    "/$user/artworks": {
      "filePath": "$user/artworks.lazy.tsx",
      "parent": "/$user"
    },
    "/$user/followers": {
      "filePath": "$user/followers.lazy.tsx",
      "parent": "/$user"
    },
    "/$user/followings": {
      "filePath": "$user/followings.lazy.tsx",
      "parent": "/$user"
    },
    "/$user/likes": {
      "filePath": "$user/likes.lazy.tsx",
      "parent": "/$user"
    },
    "/_logged/new-artwork": {
      "filePath": "_logged/new-artwork.lazy.tsx",
      "parent": "/_logged"
    },
    "/_logged/settings/general": {
      "filePath": "_logged/settings/general.lazy.tsx",
      "parent": "/_logged/settings"
    },
    "/_logged/settings/profile": {
      "filePath": "_logged/settings/profile.lazy.tsx",
      "parent": "/_logged/settings"
    }
  }
}
ROUTE_MANIFEST_END */
