/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isAdminLoggedin, setIsAdminLoggedin] = useState(false);
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  // const [users, setUsers] = useState({});

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(`${backendUrl}/api/admin/get-users`);
  //       if (response.data.success) {
  //         setUsers(response.data.users); // Set users in state
  //         toast.success(response.data.message);
  //       } else {
  //         toast.error(response.data.message || "Failed to fetch users!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       toast.error("Error fetching users!");
  //     }
  //   };

  //   fetchUsers();
  // }, [backendUrl]);

  const value = {
    backendUrl,
    isAdminLoggedin,
    setIsAdminLoggedin,
    isUserLoggedin,
    setIsUserLoggedin,
    // users,
    // setUsers,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
