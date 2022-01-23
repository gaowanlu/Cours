import React from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import InfoList from "../components/InfoList";
import PageNavigationBar from "../components/PageNavigationBar";

/**
 * 联系我们页面
 * @returns
 */
function ConcatUsView() {
  const theme = useSelector(selectTheme);
  const list1 = {
    title: "开发社区",
    rows: [
      { title: "Github", content: "github.com/gaowanlu" },
      { title: "CSDN", content: "blog.csdn.net/qq_45812941" },
    ],
  };
  const list2 = {
    title: "社交平台",
    rows: [
      { title: "QQ", content: "2209120827" },
      { title: "微信", content: "WanluGao" },
    ],
  };
  const list3 = {
    title: "其他",
    rows: [
      { title: "工作邮箱", content: "heizuboriyo@gmail.com" },
      { title: "地址", content: "桂林电子科技大学(花江校区)" },
    ],
  };
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
        <InfoList {...list1} theme={theme} bottomAlert="" />
        <InfoList {...list2} theme={theme} bottomAlert="" />
        <InfoList {...list3} theme={theme} bottomAlert="" />
      </Container>
    </React.Fragment>
  );
}

export default ConcatUsView;
