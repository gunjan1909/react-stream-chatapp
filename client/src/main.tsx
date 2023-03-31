import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; //40:50
import "stream-chat-react/dist/css/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* The query client provider is a React context provider, which allows us to access the client 
    (and thus the cache) without passing it as a prop explicitly. 
    Everytime we call useQueryClient() , we get the client.
    The useQuery & useMutation hooks use the query client internally */}
    <QueryClientProvider client={queryClient}>
      {/* main router */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
