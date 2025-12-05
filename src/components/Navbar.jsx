import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-bold">Face Attendance</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link to="/face-register" className="hover:text-gray-200">
          Register
        </Link>
        <Link to="/face-recognition" className="hover:text-gray-200">
          Recognize
        </Link>
        <Link to="/dashboard" className="hover:text-gray-200">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
