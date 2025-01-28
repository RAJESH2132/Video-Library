/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isAdminLoggedin, setIsAdminLoggedin] = useState(false);
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);

  const value = {
    backendUrl,
    isAdminLoggedin,
    setIsAdminLoggedin,
    isUserLoggedin,
    setIsUserLoggedin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
