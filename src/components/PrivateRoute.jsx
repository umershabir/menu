// components/PrivateRoute.js
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../context/AuthContex";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/menu/default" replace />;
  }

  return children;
};

export default PrivateRoute;
