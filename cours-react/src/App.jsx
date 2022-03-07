import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseCover from "./components/SuspenseCover";

/*组件懒加载*/
const SelfInfoPage = React.lazy(() => import("./pages/SelfInfoPage"));
const MorePage = React.lazy(() => import("./pages/MorePage"));
const ScorePage = React.lazy(() => import("./pages/ScorePage"));
const DateSettingPage = React.lazy(() => import("./pages/DateSettingPage"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUsPage"));
const ExamPage = React.lazy(() => import("./pages/ExamPage"));
const TalkPage = React.lazy(() => import("./pages/TalkPage"));
const CoursOSPage = React.lazy(() => import("./pages/CoursOSPage"));
const QAPage = React.lazy(() => import("./pages/QAPage"));
const MoviePage = React.lazy(() => import("./pages/MoviePage"));
const DebugPage = React.lazy(() => import("./pages/DebugPage.jsx"));
const TokenLoginPage = React.lazy(() => import("./pages/TokenLoginPage"));
const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const AssemblyPage = React.lazy(() => import("./pages/AssemblyPage"));

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<SuspenseCover />}>
        <Routes>
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
          <Route path="/token" element={<TokenLoginPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/assembly" element={<AssemblyPage />} />
          <Route path="/qa/:view" element={<QAPage />} />
          <Route index path="*" element={<IndexPage />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
