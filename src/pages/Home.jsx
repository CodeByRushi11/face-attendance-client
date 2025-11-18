import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // below code is only for testing
  const navigate = useNavigate();

  async function handleStart() {
    try {
      // Optional API call
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      alert("API Response: " + data.message);

      // Navigate to camera test page
      navigate("/camera-test");
    } catch (error) {
      console.error(error);
      navigate("/camera-test"); // still navigate even if API fails
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradiend-to-br from-blue-600 to-indigo-700 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full text-center tranform hover:scale-[1.02] transition">
        <h1 className="text-3xl font-bold text-grey-800 mb-4">
          Face Recognition Attendance
        </h1>

        <p className="text-grey-600 text-lg mb-6">
          A modern AI-powered attendance system built with face recognition and
          Aadhaar verification.
        </p>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5"
          onClick={handleStart}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
