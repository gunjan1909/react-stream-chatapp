import { Outlet, useLocation } from "react-router-dom";
import { FullScreenCard } from "../../components/FullScreenCard";
import { Link } from "../../components/Link";

export function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <Outlet />
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <Link to={isLoginPage ? "/signup" : "/login"}>
          {isLoginPage
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
}
