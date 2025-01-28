import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify"; // Notifications
import { AppContext } from "../context/AppContext";

const GetUsers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const { backendUrl } = useContext(AppContext); // Access backendUrl from context

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/get-users`);
        if (response.data.success) {
          setUsers(response.data.users); // Set users in state
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Failed to fetch users!");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users!");
      }
    };

    fetchUsers();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Manage Users
      </h1>
      <div className="max-w-[90vw] mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
        {users.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userid} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userid}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.mobile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default GetUsers;
