import {createBrowserRouter} from "react-router-dom"

export const router = createBrowserRouter([
   {
      element: <AuthLayout/>,
      children: [
         {path: "login", element: <Login/>},
         {path: "signup", element: <:Signup/>},
      ]
   }
])