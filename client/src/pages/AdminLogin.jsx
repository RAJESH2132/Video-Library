import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsAdminLoggedin, isAdminLoggedin } =
    useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsAdminLoggedin(true);
        navigate("/admin/dashboard");
        toast.success("Logged in Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/is-auth`);
        setIsAdminLoggedin(response.data.success);
      } catch {
        setIsAdminLoggedin(false);
      }
    };

    checkAdminAuth();

    if (isAdminLoggedin) {
      navigate("/admin/dashboard");
    }
  }, [isAdminLoggedin, navigate, backendUrl, setIsAdminLoggedin]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium flex justify-center items-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
