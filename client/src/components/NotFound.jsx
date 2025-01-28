import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-52">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="text-blue-500">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
