import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import LiveView from "../view/LiveView";

/**
 * 组件调试界面
 * @returns
 */
function DebugPage(props) {
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="其他程序" backTitle="更多" backPath="/more" />
      <Routes>
        <Route exact path="/live" element={<LiveView />} />
        <Route path="*" element={<AppMenu />} />
      </Routes>
    </React.Fragment>
  );
}

/*程序桌面调试*/
function AppMenu() {
  return <ScreenAllContainer></ScreenAllContainer>;
}

const ScreenAllContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
`;

export default DebugPage;
