import ReactDOM from 'react-dom/client';
import '@/assets/index.css';
import { RouterProvider } from '@tanstack/react-router';
import { createCtx, connectLogger } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import * as model from './model';
import { router } from './router';

const ctx = createCtx();
connectLogger(ctx);
model.refreshSession(ctx);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <reatomContext.Provider value={ctx}>
    <RouterProvider router={router} context={{ reatomCtx: ctx }} />
  </reatomContext.Provider>,
);
