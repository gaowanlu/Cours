import React, { useEffect, useState } from "react";
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
function TalkPage(props) {
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(undefined);
  const [socketId, setSocketId] = useState("");
  useEffect(() => {
    let socket = io(talkSocketPath);
    socket.on("connect", () => {
      console.log("socketId", socket.id);
      console.log("socket", socket);
      setSocketId(socket.id);
      setSocket(socket);
    });
    socket.on("message", (data) => {
      recev(data);
    });
    socket.send({ info: "冒个泡 嘿嘿!🐸" });
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
      <PageNavigationBar title="Talk" backTitle="OS" backPath="/other/" />
      <ContainerStyled className="animate__animated animate__fadeInRight animate__faster">
        <ul>
          {messageList.map((v, i) => {
            return (
              <li key={v.id + v.index}>
                <Fade bottom>
                  <MessageBubble {...v} toRight={v.id === socketId} />
                </Fade>
              </li>
            );
          })}
        </ul>
      </ContainerStyled>
      <MessageSender send={sendHandle} />
    </React.Fragment>
  );
}

const ContainerStyled = styled.div`
  margin-bottom: 4rem;
  li {
    list-style: none;
  }
  overflow-y: clip;
  padding: 0.7rem;
  padding-top: 0;
  padding-bottom: 3rem;
  background-color: var(--color-background);
  color: var(--color-color);
`;

export default TalkPage;
