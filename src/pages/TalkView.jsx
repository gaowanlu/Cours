import React, { useEffect, useState } from "react";
import { Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import { io } from "socket.io-client";
import { talkSocketPath } from "../api/config";
import MessageSender from "../components/MessageSender";
import CardLayout from "../components/CardLayout";
import Fade from "react-reveal/Fade";

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
      v.date = Date.parse(v.date);
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
        title="Messager"
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
                  <CardLayout theme={theme}>
                    内容:{v.info}
                    <br /> 发送者:{v.id}
                    <br /> 时间:{v.date} <br />
                    缓存索引:{v.index}
                  </CardLayout>
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
`;

export default TalkView;
