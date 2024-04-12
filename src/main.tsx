import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "@/App";
import "@/assets/index.css";
import UserStore from "./store/userStore";
import { createContext } from "react";

const userStore = new UserStore();
export const Context = createContext({
  userStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore }}>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
    ,
  </Context.Provider>,
);
