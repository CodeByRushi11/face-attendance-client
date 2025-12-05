import React, { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Students</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        + Add New Student
      </button>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3 capitalize">{s.role}</td>
              <td className="p-3">
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
