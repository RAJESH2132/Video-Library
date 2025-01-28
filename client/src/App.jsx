import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/AdminLogin";
import UsersLogin from "./pages/UsersLogin";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoDescription from "./pages/VideoDesciption";
import EditVideo from "./components/EditVideo";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute element={<AdminDashboard />} type="admin" />
            }
          />
          <Route path="/admin/edit-video/:videoId" element={<EditVideo />} />
          <Route path="video/:videoId" element={<VideoDescription />} />
        </Route>

        {/* User Routes */}
        <Route path="/user">
          <Route index element={<UsersLogin />} />
          <Route
            path="dashboard"
            element={<ProtectedRoute element={<UserDashboard />} type="user" />}
          />
          <Route path="video/:videoId" element={<VideoDescription />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
