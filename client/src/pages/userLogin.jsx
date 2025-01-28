import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const { backendUrl, isUserLoggedin, setIsUserLoggedin } =
    useContext(AppContext);
  const [state, setState] = useState("Login"); // "Register" or "Login"
  const [loading, setLoading] = useState(false);

  // Form fields
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/is-auth`);
        setIsUserLoggedin(response.data.success);
      } catch {
        setIsUserLoggedin(false);
      }
    };
    checkUserAuth();
    if (isUserLoggedin) {
      navigate("/user/dashboard"); // Redirect if user is already authenticated
    }
  }, [isUserLoggedin, navigate, backendUrl, setIsUserLoggedin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (state === "Register") {
        // Validation for Register
        if (userid.length < 4)
          return toast.error("User ID must be at least 4 characters long");
        if (!/^[a-zA-Z0-9]{3,30}$/.test(username))
          return toast.error("Username must be 3-30 alphanumeric characters");
        if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email");
        if (password.length < 6)
          return toast.error("Password must be at least 6 characters long");
        if (!/^\d{10}$/.test(mobile))
          return toast.error("Mobile number must be exactly 10 digits");

        // API call for Register
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          userid,
          username,
          email,
          password,
          mobile,
        });

        if (data.success) {
          toast.success(data.message);
          setIsUserLoggedin(true); // Mark the user as logged in
          navigate("/user/dashboard"); // Redirect to the dashboard
        } else {
          toast.error(data.message);
        }
      } else {
        // Validation for Login
        if (!userid.trim() && !email.trim())
          return toast.error("User ID or Email is required");
        if (!password.trim()) return toast.error("Password is required");

        // API call for Login
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          userid: userid || undefined,
          email: email || undefined,
          password,
        });

        if (data.success) {
          toast.success("Login successful");
          setIsUserLoggedin(true); // Mark the user as logged in
          navigate("/user/dashboard"); // Redirect to the dashboard
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {state === "Register" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          {state === "Register"
            ? "Create your account to get started"
            : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "Register" && (
            <>
              <div>
                <label
                  htmlFor="userid"
                  className="block text-sm font-medium text-gray-700"
                >
                  User ID
                </label>
                <input
                  id="userid"
                  type="text"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your user ID"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your username"
                />
              </div>
            </>
          )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={
                state === "Register" ? "Enter your email" : "Email or User ID"
              }
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {state === "Register" && (
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your mobile number"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              state
            )}
          </button>
        </form>

        {state === "Register" ? (
          <p className="mt-4 text-xs text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-xs text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("Register")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
