import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket";
const FaceRecognition = () => {
  const videoRef = useRef();
  const [users, setUsers] = useState([]);
  const [matchUser, setMatchUser] = useState(null);
  const [message, setMessage] = useState("");

  // Load models + camera + users
  useEffect(() => {
    async function loadAll() {
      console.log("📌 Loading face-api models...");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      console.log("✔ Models loaded");

      // Start webcam
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });

      // Load database users
      fetch("http://localhost:5000/api/users")
        .then((res) => res.json())
        .then((data) => {
          console.log("📥 Users loaded:", data.users);
          setUsers(data.users);
        });
    }

    loadAll();
  }, []);
  useEffect(() => {
    socket.on("attendance-marked", (data) => {
      if (data.studentId === studentId) {
        toast.success("Attendance marked successfully!");
      }
    });

    return () => socket.off("attendance-marked");
  }, []);
  const recognizeFace = async () => {
    setMessage("Detecting...");

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setMessage("⚠ No face detected");
      return;
    }

    console.log("✔ Face detected");

    // Build labeled descriptors
    const labeledDescriptors = users
      .filter(
        (u) => Array.isArray(u.faceDescriptor) && u.faceDescriptor.length > 0
      )
      .map((user) => {
        return new faceapi.LabeledFaceDescriptors(user.name, [
          new Float32Array(user.faceDescriptor),
        ]);
      });

    if (labeledDescriptors.length === 0) {
      setMessage("❌ No trained user data found in database!");
      return;
    }

    const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    const bestMatch = matcher.findBestMatch(detection.descriptor);

    console.log("🎯 Best Match:", bestMatch);

    if (bestMatch.label === "unknown") {
      setMessage("❌ No match found");
      setMatchUser(null);
    } else {
      setMessage("✔ Match Found");
      setMatchUser(bestMatch.label);
      markAttendance(bestMatch.label);
    }
  };

  // Mark Attendance
  const markAttendance = async (name) => {
    const user = users.find((u) => u.name === name);
    if (!user) return;

    const response = await fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <Toaster position="top-right" />

      <h1 className="text-4xl font-bold mb-4">Face Recognition</h1>

      <div className="border-4 border-indigo-500 rounded-2xl overflow-hidden shadow-xl mb-4">
        <video ref={videoRef} width="350" height="200" autoPlay muted />
      </div>

      <button
        onClick={recognizeFace}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md"
      >
        Identify Face
      </button>

      <p className="text-lg mt-4">{message}</p>

      {matchUser && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold text-green-600">
            Welcome {matchUser}
          </h2>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
