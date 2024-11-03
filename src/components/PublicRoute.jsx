// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
export default PublicRoute;
