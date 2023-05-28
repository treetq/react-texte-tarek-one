import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  if (!auth.isInialized) {
    <div>Loading..</div>;
  }

  if (!auth.isLoggedIn) {
    <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
};
export default AuthGuard;
