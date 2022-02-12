import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DayPage from "./pages/DayPage";
import WeekPage from "./pages/WeekPage";
import SuspenseCover from "./components/SuspenseCover";
import DebugPage from "./pages/DebugPage";
/*组件懒加载*/
const SelfInfoPage = React.lazy(() => import("./pages/SelfInfoPage"));
const MorePage = React.lazy(() => import("./pages/MorePage"));
const ScorePage = React.lazy(() => import("./pages/ScorePage"));
const DateSettingPage = React.lazy(() => import("./pages/DateSettingPage"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUsPage"));
const ExamPage = React.lazy(() => import("./pages/ExamPage"));
const TalkPage = React.lazy(() => import("./pages/TalkPage"));
const CoursOSPage = React.lazy(() => import("./pages/CoursOSPage"));

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<SuspenseCover />}>
        <Routes>
          <Route path="/table" element={<DayPage />} />
          <Route path="/week" element={<WeekPage />} />
          <Route exact path="/selfInfo" element={<SelfInfoPage />} />
          <Route exact path="/more" element={<MorePage />} />
          <Route exact path="/suspenseCover" element={<SuspenseCover />} />
          <Route exact path="/score" element={<ScorePage />} />
          <Route exact path="/dateSetting" element={<DateSettingPage />} />
          <Route exact path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/other/*" element={<CoursOSPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route index path="*" element={<DayPage />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
