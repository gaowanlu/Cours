import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import LiveView from "../view/LiveView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slickOveride from "../styles/SlickOveride.module.css";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const ios = {
  chat: "https://cdn.jim-nielsen.com/ios/512/fonts-by-fontkey-chat-ig-2021-06-02.png",
  live: "https://cdn.jim-nielsen.com/ios/512/yubo-make-friends-go-live-2021-09-16.png",
  debug:
    "https://cdn.jim-nielsen.com/ios/512/scanner-air-scan-documents-2021-08-16.png",
};

/**
 * 组件调试界面
 * @returns
 */
function DebugPage(props) {
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="Cours OS" backTitle="更多" backPath="/more" />
      <Routes>
        <Route exact path="/live" element={<LiveView />} />
        <Route path="*" element={<AppMenu />} />
      </Routes>
    </React.Fragment>
  );
}

/*程序桌面调试*/
function AppMenu() {
  return (
    <ScreenAllContainer
      className={`${slickOveride["cours-react-slick"]} ${slickOveride["button-hover"]}`}
    >
      <SimpleSlider />
      <DockerBar>
        <DockerBarLeft></DockerBarLeft>
        <DockerBarRight>
          <span>
            <ApplicationIconLink to="/talk">
              <ApplicationIcon src={ios.chat} alt="" />
            </ApplicationIconLink>
          </span>
        </DockerBarRight>
      </DockerBar>
    </ScreenAllContainer>
  );
}

/*slider*/
function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      <Section>
        <div>
          <ApplicationIconBlockLink to="/talk">
            <ApplicationIcon src={ios.chat} alt="" />
            <p>Talk</p>
          </ApplicationIconBlockLink>
        </div>
        <div>
          <ApplicationIconBlockLink to="/other/live">
            <ApplicationIcon src={ios.live} alt="" />
            <p>Live</p>
          </ApplicationIconBlockLink>
        </div>
        <div>
          <ApplicationIconBlockLink to="/debug">
            <ApplicationIcon src={ios.debug} alt="" />
            <p>Assembly</p>
          </ApplicationIconBlockLink>
        </div>
      </Section>
      <Section>
        <PageHeader title="Stay hungry,Stay foolish" size={1} />
      </Section>
    </Slider>
  );
}

const ScreenAllContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
  position: relative;
`;

const DockerBar = styled.div`
  height: 4.2rem;
  width: 90vw;
  background-color: var(--color-background-front);
  box-shadow: var(--box-shadow);
  border-radius: 0.6rem;
  position: absolute;
  left: 5%;
  bottom: 1rem;
  display: flex;
  @media screen and (min-width: 1000px) {
    width: 80vw;
    left: 10vw;
  }
  color: var(--color-color);
  padding: 8px;
  box-sizing: border-box;
`;

const DockerBarLeft = styled.div`
  height: 100%;
  flex: 3;
  padding-right: 5px;
  box-sizing: border-box;
`;

const DockerBarRight = styled.div`
  height: 100%;
  flex: 1;
  border-left: 1px solid #70707063;
  padding-left: 5px;
  box-sizing: border-box;
`;

const Section = styled.div`
  height: calc(100vh - 3rem - 8rem);
  padding: 1rem;
  box-sizing: border-box;
  color: var(--color-color);
  display: flex !important;
  flex-wrap: wrap;
  @media screen and (min-width: 1000px) {
    padding: 2rem;
  }
`;

const ApplicationIcon = styled.img`
  width: 3.2rem;
  border-radius: 0.6rem;
  display: inline-block;
`;

const ApplicationIconBlockLink = styled(Link)`
  color: var(--color-color);
  width: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & p {
    text-align: center;
    width: 4rem;
    font-weight: bold;
    padding-top: 0.4rem;
  }
  text-decoration: none;
  border-radius: 0.8rem;
  margin: 10px;
  background-color: var(--color-background-front);
  padding: 1rem;
  @media screen and (min-width: 1000px) {
    padding: 2rem;
  }
  &:hover {
    transform: scale(1.05);
    transition: transform 200ms ease-in-out;
  }
`;

const ApplicationIconLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default DebugPage;
