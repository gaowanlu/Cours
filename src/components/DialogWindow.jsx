import React, { useState, useEffect } from "react";
import styled from "styled-components";

/*窗口关闭回调*/
function DialogWindow(props) {
  const [onWindow, setOnWindow] = useState(true);
  const [windowClass, setWindowClass] = useState(
    "animate__animated animate__slideInUp  animate__faster"
  );
  useEffect(() => {
    /*锁定浏览器窗口竖直滑动*/
    document.getElementById("root").style.height = "100vh";
    document.getElementById("root").style.overflow = "hidden";
    return () => {
      document.getElementById("root").style.height = "auto";
      document.getElementById("root").style.overflow = "visible";
    };
  }, []);
  let mouseOutEvent = (e) => {
    setOnWindow(false);
  };
  let mouseEnterEvent = (e) => {
    setOnWindow(true);
  };
  let clickEvent = (e) => {
    if (onWindow === false) {
      setWindowClass(
        "animate__animated animate__slideOutDown  animate__faster"
      );
      //有关闭动画500ms
      setTimeout(() => {
        props.close(); //组件消失回调
      }, 400);
    }
  };
  return (
    <Container onClick={clickEvent}>
      <Card
        onMouseOut={mouseOutEvent}
        onMouseEnter={mouseEnterEvent}
        className={windowClass}
      >
        {props.children}
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff3;
  position: fixed;
  z-index: 999999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2px);
  padding: 0.5rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #fafafa;
  /* background: linear-gradient(to bottom, #f3d1be, 38%, #4ec5d6); */
  box-shadow: 0px 0px 10px 2px #61606023;
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  margin-top: 20vh;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
`;

export default DialogWindow;
