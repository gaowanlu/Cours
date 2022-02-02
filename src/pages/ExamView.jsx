import React from "react";
import { Header, Container } from "./MoreView";
import PageNavigationBar from "../components/PageNavigationBar";
import CardLayout from "../components/CardLayout";
import DebugView from "./DebugView";

/**
 * 考试安排页面
 * @returns
 */
function ExamView(props) {
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="考试安排" backTitle="更多" backPath="/more" />
      <Container className="animate__animated animate__fadeInRight animate__faster">
        <Header title="考试安排" />
        <CardLayout>HELLO</CardLayout>
      </Container>
    </React.Fragment>
  );
}

export const { View } = { ExamView };

export default DebugView;
