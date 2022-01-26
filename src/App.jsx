import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DayView from "./pages/DayView";
import WeekView from "./pages/WeekView";
import SuspenseCover from "./components/SuspenseCover";
/*调试*/
import CourseDetailList from "./components/CourseDetailList";
/*组件懒加载*/
const SelfInfoView = React.lazy(() => import("./pages/SelfInfoView"));
const MoreView = React.lazy(() => import("./pages/MoreView"));
const ScoreView = React.lazy(() => import("./pages/ScoreView"));
const DateSettingView = React.lazy(() => import("./pages/DateSettingView"));
const AboutUsView = React.lazy(() => import("./pages/AboutUsView"));
const ConcatUsView = React.lazy(() => import("./pages/ConcatUsView"));

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<SuspenseCover />}>
        <Routes>
          <Route path="/table" element={<DayView />} />
          <Route path="/week" element={<WeekView />} />
          <Route exact path="/selfInfo" element={<SelfInfoView />} />
          <Route exact path="/more" element={<MoreView />} />
          <Route exact path="/suspenseCover" element={<SuspenseCover />} />
          <Route exact path="/score" element={<ScoreView />} />
          <Route exact path="/dateSetting" element={<DateSettingView />} />
          <Route exact path="/aboutUs" element={<AboutUsView />} />
          <Route exact path="/concatUs" element={<ConcatUsView />} />
          <Route exact path="/debug" element={<CourseDetailList />} />
          <Route index path="*" element={<DayView />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
