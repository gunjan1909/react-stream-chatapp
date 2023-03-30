import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RootLayout() {
  const { user } = useAuth();
  //alert(user);

  //if we go to home but no user exists, it redirects to login page
  if (user == null) return <Navigate to="/login" />;

  return <Outlet />;
}
