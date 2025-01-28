/* eslint-disable react/prop-types */
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = ({ element, type = "admin" }) => {
  const { isAdminLoggedin, isUserLoggedin } = useContext(AppContext);

  if (type === "admin") {
    return isAdminLoggedin ? element : <Navigate to="/admin" />;
  } else if (type === "user") {
    return isUserLoggedin ? element : <Navigate to="/user" />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
