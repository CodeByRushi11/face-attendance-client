import * as faceapi from "face-api.js";
export async function loadFaceModels() {
  const MODEL_URL = "/models";
  console.log("Loading from:", MODEL_URL);
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    console.log("Models loaded successfully");
    return true;
  } catch (error) {
    console.error("MODEL LOAD ERROR", error);
  }
}
