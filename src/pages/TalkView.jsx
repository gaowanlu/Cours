import React, { useEffect, useState } from "react";
import { Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import { io } from "socket.io-client";
import { talkSocketPath } from "../api/config";
import MessageSender from "../components/MessageSender";
import Fade from "react-reveal/Fade";
import MessageBubble from "../components/MessageBubble";
import stringHashRGB from "../utils/stringHashRGB.ts";

/**
 * 在线交流界面
 * @returns
 */
function TalkView(props) {
  const theme = useSelector(selectTheme);
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(undefined);
  useEffect(() => {
    let socket = io(talkSocketPath);
    socket.on("connect", () => {
      console.log("socketId", socket.id);
      console.log("socket", socket);
      setSocket(socket);
    });
    socket.on("message", (data) => {
      recev(data);
    });
    socket.send({ info: "我来了" });
    return () => {
      socket.disconnect(); //离开此页面时断开连接
    };
  }, []);
  const recev = (data) => {
    data.forEach((v, i, a) => {
      let str = v.date + "";
      v.date = new Date(str.slice(0, 19));
      v.rgb = stringHashRGB(v.id); //hash 头像背景色
    });
    setMessageList(data);
    console.log("来消息了", data);
    window.scrollTo(
      0,
      document.documentElement.offsetHeight - window.innerHeight
    ); //回到底部
  };

  /**消息发送 */
  const sendHandle = (message) => {
    socket.send({ info: message });
  };
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="信使服务"
        backTitle="更多"
        backPath="/more"
      />
      <ContainerStyled
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <ul>
          {messageList.map((v, i) => {
            return (
              <li key={v.id + v.index}>
                <Fade bottom>
                  <MessageBubble {...v} />
                </Fade>
              </li>
            );
          })}
        </ul>
      </ContainerStyled>
      <MessageSender theme={theme} send={sendHandle} />
    </React.Fragment>
  );
}

const ContainerStyled = styled(Container)`
  margin-bottom: 4rem;
  padding-top: 0;
  li {
    list-style: none;
  }
  overflow-y: clip;
`;

export default TalkView;
