import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const UserLogout = () => {
  const navigate = useNavigate();
  const { setIsUserLoggedin, backendUrl } = useContext(AppContext);

  // Logout function
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/user/logout`);
      if (data.success) {
        setIsUserLoggedin(false); // Set user login state to false
        navigate("/"); // Navigate to the homepage or login page
      }
    } catch (error) {
      toast.error(error.message); // Show an error if something goes wrong
    }
  };
  return (
    <>
      {/* Logout Button */}
      <button
        onClick={logout}
        className="absolute top-6 right-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </>
  );
};

export default UserLogout;
