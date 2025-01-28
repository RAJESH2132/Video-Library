import VideoList from "../components/VideoList";
import UserLogout from "../components/UserLogout";

const UserDashboard = () => {
  return (
    <>
      <UserLogout />
      <VideoList />
    </>
  );
};

export default UserDashboard;
