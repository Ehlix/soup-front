import ReactDOM from 'react-dom/client';
import '@/assets/index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createCtx, connectLogger } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

const ctx = createCtx();
connectLogger(ctx);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <reatomContext.Provider value={ctx}>
    <RouterProvider router={router} />
  </reatomContext.Provider>,
);
