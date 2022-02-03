import React from "react";
import { Header, Container } from "./MoreView";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import Webcam from "react-webcam";
import CardLayout from "../components/CardLayout";
import flvjs from "flv.js";

/**
 * 组件调试界面
 * @returns
 */
function DebugView(props) {
  const webcamRef = React.useRef(null);
  const videoDOM = React.useRef(null);
  React.useEffect(() => {
    webcamRef.current.video.setAttribute("controls", "true");
    webcamRef.current.video.volume = 0;
  }, [webcamRef]);
  React.useEffect(() => {
    if (flvjs.isSupported()) {
      var flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: "https://linkway.site:5559/live/cliver.flv",
      });
      flvPlayer.attachMediaElement(videoDOM.current);
      flvPlayer.load();
      // flvPlayer.play();
    }
  }, [videoDOM]);
  const pushStream = (stream) => {
    console.log("推流", stream);
  };
  const webcamConfig = {
    audio: true,
    videoConstraints: {
      width: 1280,
      height: 720,
      facingMode: "user",
    },
  };
  const chanelChange = (e) => {
    e.preventDefault();
    //webcamRef.current.video.pause();
    //webcamRef.current.video.srcObject = webcamRef.current.stream;
    videoDOM.current.srcObject = webcamRef.current.stream;
    pushStream(webcamRef.current.stream);
  };
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="直播" backTitle="更多" backPath="/more" />
      <Container className="animate__animated animate__fadeInRight animate__faster">
        <Header title="Cliver 暂无活动 尽情期待" size={1} />
        <FlexCenterContainer>
          <Webcam
            ref={webcamRef}
            {...webcamConfig}
            onUserMedia={pushStream}
            style={{
              maxWidth: "55rem",
              width: "100%",
              maxHeight: "50vh",
              display: "none",
            }}
          />
        </FlexCenterContainer>
        <FlexCenterContainer>
          <video
            ref={videoDOM}
            controls
            autoPlay
            style={{
              maxWidth: "55rem",
              width: "100%",
              maxHeight: "50vh",
            }}
          >
            <source
              src="http://127.0.0.1:5559/live/cliver.flv"
              type="video/flv"
            />
          </video>
        </FlexCenterContainer>
        <CardLayout>
          <Button name="1" onClick={chanelChange}>
            测试相机
          </Button>
        </CardLayout>
      </Container>
    </React.Fragment>
  );
}

const FlexCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: 0;
  padding: 0.5rem;
  color: #fafafa;
  background-color: var(--color-primary);
  border-radius: 0.3rem;
  cursor: pointer;
`;

export default DebugView;
