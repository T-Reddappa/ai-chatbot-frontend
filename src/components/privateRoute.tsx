import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");

  return authData && authData.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/nudge" />
  );
};

export default PrivateRoute;
