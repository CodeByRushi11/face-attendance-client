import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Not logged in → Redirect
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />; // No access

  return children;
};

export default ProtectedRoute;
