import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants";

const GuestGuard = ({ children }) => {
  const auth = useAuth();
  if (!auth.isInitilaized) {
    <div>Loading...</div>;
  }

  if (auth.isLoggedIn) {
    <Navigate to={ROUTES.TEXTE_LIST} />;
  }
  return children;
};

export default GuestGuard;
