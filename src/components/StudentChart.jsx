import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StudentChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Student Attendance Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="student" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="daysPresent" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentChart;
