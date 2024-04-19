import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/assets/index.css";
import UserStore from "./store/userStore";
import { createContext } from "react";
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
const router = createRouter({ routeTree })

const userStore = new UserStore();
export const Context = createContext({
  userStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore }}>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Context.Provider>,
);
