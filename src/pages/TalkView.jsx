import React from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import CardLayout from "../components/CardLayout";

/**
 * 在线交流界面
 * @returns
 */
function TalkView(props) {
  const theme = useSelector(selectTheme);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="在线交流"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title="在线交流" />
        <CardLayout theme={theme}>HELLO</CardLayout>
      </Container>
    </React.Fragment>
  );
}

export default TalkView;
