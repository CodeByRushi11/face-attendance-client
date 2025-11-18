import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CameraTest from "./pages/CameraTest";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera-test" element={<CameraTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
