import React, { useEffect, useRef, useState } from "react";

const CameraView = ({ onReady }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPermissionBox, setShowPermissionBox] = useState(true);

  async function startCamera() {
    try {
      setLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setLoading(false);
      onReady();
    } catch (err) {
      alert("Camera Access Denied!");
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Permission Popup */}
      {showPermissionBox && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-2xl max-w-sm text-center shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Camera Permission</h2>
            <p className="mb-4">This feature needs access to your camera.</p>
            <button
              onClick={() => {
                setShowPermissionBox(false);
                startCamera();
              }}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
            >
              Allow Camera
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-3 text-gray-700 text-center">
          Live Camera View
        </h2>

        <div className="relative w-full h-72 bg-black rounded-xl overflow-hidden border-4 border-blue-600 shadow-lg">
          {loading && (
            <p className="absolute inset-0 flex items-center justify-center text-white">
              Loading Camera...
            </p>
          )}

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <p className="text-center text-gray-500 mt-3 text-sm">
          Make sure your face is visible & well-lit.
        </p>
      </div>
    </div>
  );
};

export default CameraView;
