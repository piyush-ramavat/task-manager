import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main-page";
import Home from "./pages/home-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
