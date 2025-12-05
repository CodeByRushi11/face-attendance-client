import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { role } = useAuth();

  return role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoutes;
