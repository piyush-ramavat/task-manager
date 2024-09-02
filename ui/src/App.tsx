import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";

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
