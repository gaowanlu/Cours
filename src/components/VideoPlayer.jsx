import React from "react";
/**
 * 视频播放器
 * @param {} props
 * @returns
 */
function VideoPlayer(props) {
  const videoDOM = React.useRef(null);
  React.useEffect(() => {}, [videoDOM]);
  return (
    <React.Fragment>
      <video
        style={{ width: "100%" }}
        autoPlay
        ref={videoDOM}
        src="./demo.mp4"
      ></video>
    </React.Fragment>
  );
}

export default VideoPlayer;
