import React, { useState } from "react";
import { loadFaceModels } from "../utils/loadFaceModels";
import CameraView from "../components/CameraView";

const CameraTest = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  async function loadModels() {
    await loadFaceModels();
    setModelLoaded(true);
    alert("Face Models Loaded ✔️");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 to-indigo-700 p-6 text-white">
      <div className="space-y-6 max-w-xl mx-auto">
        {/* Load modal buttons */}
        <button
          onClick={loadModels}
          className="w-full py-3 bg-purple-900 hover:bg-purple-800 rounded-xl font-semibold text-lg shadow-lg"
        >
          Load Face Modals
        </button>
        {/* Camera View  */}
        <CameraView onReady={() => setCameraReady(true)} />
        {/* Status */}
        <div className="text-center space-y-2">
          <p className="text-lg">
            📷Camera:{cameraReady ? "Ready ✔️" : "Not Ready ❌"}
          </p>
          <p className="text-lg">
            🔃Modals {modelLoaded ? "Loaded ✔️" : "Not Loaded ❌"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraTest;
