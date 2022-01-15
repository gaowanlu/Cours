import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DayView from "./pages/DayView";
import Footer from "./components/Footer";
import WeekView from "./pages/WeekView";
import SelfInfoView from "./pages/SelfInfoView";
import MoreView from "./pages/MoreView";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/table" element={<DayView />} />
        <Route path="/week" element={<WeekView />} />
        <Route exact path="/selfInfo" element={<SelfInfoView />} />
        <Route exact path="/more" element={<MoreView />} />
        <Route index path="*" element={<DayView />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
