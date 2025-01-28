import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // To programmatically navigate after setting the role

  const handleAdminLogin = () => {
    navigate("/admin"); // Navigate to the admin page
  };

  const handleUserLogin = () => {
    navigate("/user"); // Navigate to the user page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-8">
        Technologies Video Library
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 p-4">
        {/* Admin Login Button */}
        <button
          onClick={handleAdminLogin}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-white text-lg font-semibold rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Admin Login
        </button>

        {/* User Login Button */}
        <button
          onClick={handleUserLogin}
          className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white text-lg font-semibold rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          User Login
        </button>
      </div>
    </div>
  );
};

export default Home;
