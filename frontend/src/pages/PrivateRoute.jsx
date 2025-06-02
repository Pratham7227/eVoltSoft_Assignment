
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {
   const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
