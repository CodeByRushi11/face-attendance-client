import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Face Attendance
          </h2>
          <p className="text-sm leading-6">
            Smart AI-based facial recognition attendance system for schools and
            colleges.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-white">
                Register
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white">
                Admin Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
          <p className="text-sm">📩 support@faceattendance.com</p>
          <p className="text-sm">📍 India | Remote</p>
        </div>
      </div>

      <div className="text-center py-3 bg-gray-800 text-xs">
        © {new Date().getFullYear()} Face Attendance — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
