import { useState } from "react";
import Sidebar from "../components/SideBar";
import AddVideo from "../components/AddVideo";
import AddCategory from "../components/AddCategory";
import AdminVideoList from "../components/AdminVideoList";
import GetCategories from "../components/GetCategories";
import AdminLogout from "../components/AdminLogout";
import GetUsers from "../components/GetUsers";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Add Video");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["Sports", "Music", "Education", "Movies"];

  const renderContent = () => {
    switch (selectedOption) {
      case "Add Video":
        return <AddVideo />;
      case "Add Category":
        return <AddCategory />;
      case "Get Videos":
        return <AdminVideoList selectedCategory={selectedCategory} />;
      case "Get Categories":
        return <GetCategories />;
      case "Get Users":
        return <GetUsers />;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminLogout />
      <div className="flex h-screen">
        {/* Left Column - Sidebar */}
        <Sidebar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          categories={categories}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Right Column - Dynamic Content */}
        <div className="w-3/4 bg-gray-300 p-6 overflow-y-auto h-screen  ">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
