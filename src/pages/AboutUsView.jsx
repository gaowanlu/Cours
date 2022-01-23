import React from "react";
import { Header, Container } from "./MoreView";
import CardLayout from "./../components/CardLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import LogoPNG from "../assets/png/logo.png";
import InfoList from "../components/InfoList";
import PageNavigationBar from "../components/PageNavigationBar";

/**
 * 关于我们页面
 * @returns
 */
function AboutUsView() {
  const theme = useSelector(selectTheme);
  let projectInfoList = {
    title: "开发背景",
    rows: [
      { title: "开发者", content: "一个桂电软工的菜鸡。" },
      { title: "愿景", content: "希望让自己写的东西方便大家。" },
      { title: "版本", content: "v0.0.1" },
    ],
  };
  let wishInfoList = {
    title: "我的愿望",
    rows: [
      {
        title: "关于应用使用",
        content:
          "这只是一个编码小子写出来的东西，如果您体验较好我非常荣幸，但仍需注意它可能有时会出问题。如上课信息、考试安排大家能够查看教务系统对比，以免误导大家。",
      },
      {
        title: "加入我们",
        content:
          "如果您也热爱编码、熟悉软件开发知识或者React Node UI设计以及美术等，并且您希望将Cours变得更好，我们非常希望您加入我们共同改进它。",
      },
      {
        title: "说不的事",
        content:
          "如果发现BUG希望您做出正确的事情、请不要测试我们的API、它的能力真的很弱。",
      },
      {
        title: "贡献",
        content:
          "服务的运行需要花销费用、如果服务有时会崩使用者请谅解。贡献Everything 联系 heizuboriyo@gmail.com 。",
      },
    ],
  };
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="关于我们"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title="关于我们" />
        <CardLayout theme={theme}>
          <LogoContainer>
            <img src={LogoPNG} alt="" />
            <p>Cours</p>
          </LogoContainer>
        </CardLayout>
        <InfoList {...projectInfoList} theme={theme} bottomAlert="" />
        <InfoList {...wishInfoList} theme={theme} bottomAlert="" />
      </Container>
    </React.Fragment>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    width: 6rem;
    border-radius: 3rem;
  }
  p {
    width: 100%;
    text-align: center;
    padding-top: 0.5rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export default AboutUsView;
