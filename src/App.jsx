import React from "react";
import { Route, Routes } from "react-router-dom";
import TableView from "./pages/TableView";
import Footer from "./components/Footer";
import WeekView from "./pages/WeekView";
import SelfInfoView from "./pages/SelfInfoView";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/table" element={<TableView />} />
        <Route exact path="/week" element={<WeekView />} />
        <Route exact path="/selfInfo" element={<SelfInfoView />} />
        <Route path="*" element={<TableView />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
