const Home = () => {
  return (
    <div className="text-center mt-16 px-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-blue-600">
        Face Recognition Attendance System
      </h1>

      <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
        A modern attendance solution using AI & Facial Recognition. Fast,
        secure, and perfect for schools, colleges, & offices.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <a
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Register Now
        </a>
        <a
          href="/login"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </a>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            🎥 Live Face Scan
          </h3>
          <p className="mt-2 text-gray-600">
            Mark attendance instantly using real-time webcam scanning.
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            👨‍🎓 Student Friendly
          </h3>
          <p className="mt-2 text-gray-600">
            Easy registration & attendance with just a single face scan.
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            🧑‍🏫 Admin Dashboard
          </h3>
          <p className="mt-2 text-gray-600">
            Teachers/Admin can monitor attendance records and users.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-20 max-w-4xl mx-auto text-left">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Why This App?</h2>
        <p className="text-gray-700 leading-7">
          Traditional attendance systems are time-consuming and prone to errors.
          This AI-powered facial recognition system solves that by capturing
          attendance instantly with high accuracy and security. The system is
          ideal for institutions looking for fast, reliable & automated
          attendance recording.
        </p>

        <ul className="mt-4 list-disc pl-6 text-gray-700 leading-7">
          <li>No manual roll-calling required</li>
          <li>Eliminates proxy attendance completely</li>
          <li>Fast & secure authentication using face</li>
          <li>Admin dashboard with complete attendance logs</li>
        </ul>
      </div>

      {/* Add spacing so footer sticks bottom */}
      <div className="h-20"></div>
    </div>
  );
};

export default Home;
