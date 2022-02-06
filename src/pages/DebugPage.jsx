import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import LiveView from "../view/LiveView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slickOveride from "../style/SlickOveride.module.css";

console.log(slickOveride);

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
  return (
    <ScreenAllContainer
      className={`${slickOveride["cours-react-slick"]} ${slickOveride["button-hover"]}`}
    >
      <SimpleSlider />
      <DockerBar></DockerBar>
    </ScreenAllContainer>
  );
}

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
        <h3>1</h3>
      </Section>
      <Section>
        <h3>2</h3>
      </Section>
      <Section>
        <h3>3</h3>
      </Section>
      <Section>
        <h3>4</h3>
      </Section>
      <Section>
        <h3>5</h3>
      </Section>
      <Section>
        <h3>6</h3>
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
  height: 4.6rem;
  width: 90%;
  background-color: var(--color-background-front);
  box-shadow: var(--box-shadow);
  border-radius: 1rem;
  position: absolute;
  left: 5%;
  bottom: 1rem;
  cursor: pointer;
`;

const Section = styled.div`
  height: calc(100vh - 3rem - 10rem);
  padding: 1rem;
  cursor: pointer;
  color: var(--color-color);
`;

export default DebugPage;
