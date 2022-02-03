import React from "react";
import { Header, Container } from "./MoreView";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import Webcam from "react-webcam";
import CardLayout from "../components/CardLayout";

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
        <Header title="Cliver" size={1} />
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
            <source src="" type="video/mp4" />
          </video>
        </FlexCenterContainer>
        <CardLayout>
          <Button name="1" onClick={chanelChange}>
            频道1
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
