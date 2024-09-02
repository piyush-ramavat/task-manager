import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main-page";
import Home from "./pages/home-page";
import TaskView from "./pages/task-view";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/task-view/:taskId" element={<TaskView />} />
      </Routes>
    </>
  );
}

export default App;
