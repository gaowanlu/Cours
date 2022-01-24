import React from "react";
import { Header, Container } from "./MoreView";
import CardLayout from "../components/CardLayout";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";

/**
 * 个人成绩页面
 * @returns
 */
function ScoreView() {
  const theme = useSelector(selectTheme);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="成绩查询"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header theme={theme} title="成绩查询" />
        <CardLayout theme={theme}>成绩查询</CardLayout>
      </Container>
    </React.Fragment>
  );
}

export default ScoreView;
