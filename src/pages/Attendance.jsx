import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState({ date: "", student: "" });

  useEffect(() => {
    fetch("https://your-backend-url/api/attendance")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setFiltered(data);
      });
  }, []);

  const applyFilter = () => {
    let f = records;

    if (query.date) {
      f = f.filter((r) => r.date === query.date);
    }
    if (query.student) {
      f = f.filter((r) =>
        r.studentName.toLowerCase().includes(query.student.toLowerCase())
      );
    }

    setFiltered(f);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "attendance.xlsx");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Attendance Records</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setQuery({ ...query, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search student"
          className="border p-2 rounded"
          onChange={(e) => setQuery({ ...query, student: e.target.value })}
        />
        <button
          onClick={applyFilter}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Apply Filter
        </button>
      </div>

      <button
        onClick={exportExcel}
        className="bg-green-600 text-white p-2 rounded"
      >
        Export to Excel
      </button>

      <table className="w-full bg-white shadow rounded-xl mt-4">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r.studentName}</td>
              <td className="p-3">{r.date}</td>
              <td
                className={`p-3 font-semibold ${
                  r.status === "Present" ? "text-green-600" : "text-red-600"
                }`}
              >
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
