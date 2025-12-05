import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const RegisterFace = () => {
  const videoRef = useRef(null);
  const [name, setName] = useState("");
  const [descriptor, setDescriptor] = useState(null);
  const [message, setMessage] = useState("");
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  /** --------------------------------
   * LOAD MODELS
   ----------------------------------*/
  useEffect(() => {
    async function loadModels() {
      console.group("MODEL LOADING");

      try {
        console.log("Loading TinyFaceDetector...");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

        console.log("Loading FaceLandmark68...");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

        console.log("Loading FaceRecognitionNet...");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

        console.log("✔ All models loaded successfully.");
        setIsModelLoaded(true);
        setMessage("Models loaded successfully!");
      } catch (err) {
        console.error("❌ Model loading failed:", err);
        setMessage("Error loading models.");
      }

      console.groupEnd();
    }

    loadModels();
  }, []);

  /** --------------------------------
   * START CAMERA
   ----------------------------------*/
  useEffect(() => {
    async function startCam() {
      console.group("CAMERA START");

      try {
        console.log("Requesting camera permission...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        videoRef.current.srcObject = stream;
        console.log("✔ Camera started successfully.");
      } catch (err) {
        console.error("❌ Camera error:", err);
        setMessage("Unable to access camera.");
      }

      console.groupEnd();
    }

    startCam();
  }, []);

  /** --------------------------------
   * CAPTURE FACE DESCRIPTOR
   ----------------------------------*/
  const handleCapture = async () => {
    console.group("FACE CAPTURE");

    if (!isModelLoaded) {
      console.warn("⚠ Models not loaded yet.");
      setMessage("Models loading… please wait.");
      return;
    }

    try {
      console.log("Detecting face...");
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        console.warn("⚠ No face detected.");
        setMessage("No face detected — try again");
        console.groupEnd();
        return;
      }

      console.log("✔ Face detected:", detection);
      console.log("✔ Descriptor (128 values):", detection.descriptor);

      setDescriptor(detection.descriptor);
      setMessage("Face captured successfully!");
    } catch (err) {
      console.error("❌ Capture error:", err);
      setMessage("Face capture failed.");
    }

    console.groupEnd();
  };

  /** --------------------------------
   * REGISTER USER
   ----------------------------------*/
  const handleRegister = async () => {
    console.group("REGISTER USER");

    if (!name || !descriptor) {
      console.warn("⚠ Missing name or face descriptor.");
      setMessage("❌ Name or face data missing.");
      return;
    }

    console.log("Sending to backend:", {
      name,
      descriptor: Array.from(descriptor),
    });

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          descriptor: Array.from(descriptor),
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (data.user) {
        console.log("✔ User registered.");
        setMessage("✔ User registered successfully!");
      } else {
        console.warn("❌ Backend registration failed.");
        setMessage("❌ Registration failed.");
      }
    } catch (err) {
      console.error("❌ API error:", err);
      setMessage("Server error.");
    }

    console.groupEnd();
  };

  return (
    <div className="min-h-screen bg-gradiend-to-br from-purple-100 to-blue-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        User Registration
      </h1>

      {/* NAME INPUT */}
      <input
        type="text"
        placeholder="Enter your name"
        className="border w-full max-w-sm px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400"
        value={name}
        onChange={(e) => {
          // console.log("Name changed:", e.target.value);
          setName(e.target.value);
        }}
      />

      {/* CAMERA BOX */}
      <div className="relative border-4 border-indigo-500 shadow-xl rounded-2xl overflow-hidden mt-6 mb-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="350"
          height="280"
          className="rounded-xl"
        />
      </div>

      {/* CAPTURE BUTTON */}
      <button
        onClick={handleCapture}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
      >
        Capture Face Data
      </button>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleRegister}
        className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
      >
        Save User
      </button>

      {/* MESSAGE */}
      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}

      {/* Descriptor preview */}
      <div className="mt-6 p-4 bg-white shadow-md rounded-xl w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Descriptor:</h2>
        {descriptor ? (
          <p className="text-gray-600 text-sm">
            {descriptor.slice(0, 10).join(", ")} ... (128 values)
          </p>
        ) : (
          <p className="text-gray-500">Not captured yet</p>
        )}
      </div>
    </div>
  );
};
export default RegisterFace;
