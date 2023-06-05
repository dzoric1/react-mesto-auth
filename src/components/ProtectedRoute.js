import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return (
    loggedIn ? children : <Navigate to="/sign-up" replace />
  )
};

export default ProtectedRoute;