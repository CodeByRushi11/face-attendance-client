import React, { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState("");
  // Load face-api models
  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setIsModelLoaded(true);
    } catch (err) {
      setError("Failed to load face recognition model");
    }
  };
  // start webcam stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera permission denied or device not found");
    }
  };
  // detect face continuously
  const detectface = async () => {
    const video = videoRef.current;
    if (!video) return;
    setInterval(async () => {
      if (!isModelLoaded) return;
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 200);
  };
  // setup
  useEffect(() => {
    loadModels();
    startCamera();
  }, []);
  useEffect(() => {
    detectface();
  }, [isModelLoaded]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Face Detection Test
      </h2>
      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      <div className="relative border-4 border-indigo-500 shadow-xl rounded-xl overflow-hidden ">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="420"
          height="320"
          className="rounded-xl"
        />
        <canvas
          ref={canvasRef}
          width="420"
          height="320"
          className="absolute top-0 left-0"
        ></canvas>
        {!isModelLoaded ? (
          <p className="mt-4 text-gray-600 animate-pulse">
            Loading face detection models...
          </p>
        ) : (
          <p className="mt-4 text-green-600 font-semibold">
            {" "}
            ✔️Model Loaded.Look at the camera !
          </p>
        )}
      </div>
    </div>
  );
};

export default Camera;
