/* eslint-disable react/prop-types */

const Sidebar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="w-1/4 h-full bg-gray-100 p-4 border-r">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      {/* Navigation options */}
      <ul className="space-y-4">
        {[
          "Add Video",
          "Add Category",
          "Get Videos",
          "Get Categories",
          "Get Users",
        ].map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`cursor-pointer p-2 rounded-md ${
              selectedOption === option
                ? "bg-indigo-500 text-white"
                : "hover:bg-indigo-200"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
