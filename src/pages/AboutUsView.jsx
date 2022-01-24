import React from "react";
import { Header, Container } from "./MoreView";
import CardLayout from "../components/CardLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import LogoPNG from "../assets/png/logo.png";
import InfoList from "../components/InfoList";
import PageNavigationBar from "../components/PageNavigationBar";
import {
  selectProjectInfoList,
  selectWishInfoList,
} from "../features/aboutUs/aboutUsInfoSlice";

/**
 * 关于我们页面
 * @returns
 */
function AboutUsView() {
  const theme = useSelector(selectTheme);
  let projectInfoList = useSelector(selectProjectInfoList);
  let wishInfoList = useSelector(selectWishInfoList);
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
