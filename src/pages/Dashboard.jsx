import React, { useEffect, useState } from "react";
import { socket } from "../socket"; // <-- Live updates
import AttendanceChart from "../components/AttendanceChart";
import StudentChart from "../components/StudentChart";
import InsightsCard from "../components/InsightsCard";

const Dashboard = () => {
  const [trendData, setTrend] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });

  // ======📡 SOCKET LIVE ATTENDANCE ======
  useEffect(() => {
    socket.on("attendance-marked", (data) => {
      setLiveUpdates((prev) => [data, ...prev]);
    });
    return () => socket.off("attendance-marked");
  }, []);

  // ======📊 FETCH ANALYTICS API ======
  useEffect(() => {
    fetch("https://your-backend-url/api/analytics/weekly")
      .then((res) => res.json())
      .then((data) => setTrend(data));

    fetch("https://your-backend-url/api/analytics/student-attendance")
      .then((res) => res.json())
      .then((data) => setStudentData(data));

    fetch("https://your-backend-url/api/analytics/summary")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-blue-700 text-center">
        Admin Dashboard (Day-10)
      </h1>

      {/* 📌 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <InsightsCard
          title="Total Students"
          value={stats.total}
          color="bg-blue-600"
        />
        <InsightsCard
          title="Present Today"
          value={stats.present}
          color="bg-green-600"
        />
        <InsightsCard
          title="Absent Today"
          value={stats.absent}
          color="bg-red-600"
        />
      </div>

      {/* 📡 LIVE FEED */}
      <div className="bg-white shadow-lg rounded-xl p-5 border">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Live Attendance Feed 🔥
        </h2>

        {liveUpdates.length === 0 && (
          <p className="text-gray-500">No live activity yet…</p>
        )}

        {liveUpdates.map((u, i) => (
          <div
            key={i}
            className="p-3 my-2 rounded bg-green-50 border-l-4 border-green-600"
          >
            <b>{u.studentId}</b> marked{" "}
            <span className="text-green-700">{u.status}</span> at {u.time}
          </div>
        ))}
      </div>

      {/* 📊 CHARTS SECTION */}
      <AttendanceChart data={trendData} />
      <StudentChart data={studentData} />
    </div>
  );
};

export default Dashboard;
