// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
// import {use Auth} from "../context/AuthContext";
import { useAuth } from "../context/AuthContex";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PrivateRoute;
