import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { RootLayout } from "./pages/layouts/RootLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { NewChannel } from "./pages/channel/new";

export const router = createBrowserRouter([
  {
    //the main login signup use streamchat logout mutation function for backend connection and passing the state wrapping the entire application,  context from authprovider authcontext
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        //layout for home and other channel route, will redirect to login page if no user exist/logged in
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            //creating a new channel for chat
            path: "/channel",
            children: [{ path: "new", element: <NewChannel /> }],
          },
        ],
      },
      {
        //login and signup page layout
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
