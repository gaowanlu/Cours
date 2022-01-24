import React from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import InfoList from "../components/InfoList";
import PageNavigationBar from "../components/PageNavigationBar";
import { selectInfoList } from "../features/concatUs/concatUsInfoSlice";

/**
 * 联系我们页面
 * @returns
 */
function ConcatUsView() {
  const theme = useSelector(selectTheme);
  const list = useSelector(selectInfoList);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="联系我们"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title="联系我们" />
        <InfoList {...list[0]} theme={theme} bottomAlert="" />
        <InfoList {...list[1]} theme={theme} bottomAlert="" />
        <InfoList {...list[2]} theme={theme} bottomAlert="" />
      </Container>
    </React.Fragment>
  );
}

export default ConcatUsView;
