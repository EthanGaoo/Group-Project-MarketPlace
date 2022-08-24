import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authorised, children }) => {
  if (authorised === true) {
    return children;
  } else if (authorised === false) {
    return <Navigate to="/login" />;
  } else {
    return <p>Loading...</p>;
  }
};

export default ProtectedRoute;
