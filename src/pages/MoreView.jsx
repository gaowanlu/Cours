import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ChooseList from "../components/ChooseList";
import DialogWindow from "../components/DialogWindow";

import InfoIcon from "@mui/icons-material/Info";
import ScoreIcon from "@mui/icons-material/Score";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import GppGoodIcon from "@mui/icons-material/GppGood";
import EmailIcon from "@mui/icons-material/Email";

function MoreView() {
  const [loginDialogShow, setLoginDialogShow] = useState(false); //登录弹窗显示状态
  const [updateDataDialogShow, setUpdateDataDialogShow] = useState(false); //更新数据弹窗显示状态

  /*弹窗关闭回调*/
  const dialogClose = (name) => {
    switch (name) {
      case "login":
        setLoginDialogShow(false);
        break;
      case "updateData":
        setUpdateDataDialogShow(false);
        break;
      default:
    }
  };
  /*选择列表1*/
  const card1 = [
    { Icon: InfoIcon, text: "个人信息", to: "/selfInfo" },
    { Icon: ScoreIcon, text: "成绩查询", to: "/score" },
    {
      Icon: DownloadForOfflineIcon,
      text: "更新数据",
      to: "",
      clickCallBack: (e) => {
        e.preventDefault();
        setUpdateDataDialogShow(true);
      },
    },
    { Icon: DateRangeIcon, text: "日期设置", to: "/dateSetting" },
  ];
  /*选择列表2*/
  const card2 = [
    { Icon: BusinessIcon, text: "关于我们", to: "/aboutUs" },
    { Icon: PodcastsIcon, text: "用户条款", to: "/userTerm" },
    { Icon: GppGoodIcon, text: "开源协议", to: "/openSourceLiense" },
    { Icon: EmailIcon, text: "联系我们", to: "/concatUs" },
  ];

  return (
    <Container className="animate__animated animate__bounceInDown animate__faster">
      <Header>
        <p>更多</p>
      </Header>
      <Card>
        <ChooseList list={card1} />
      </Card>
      <Card>
        <ChooseList list={card2} />
      </Card>
      <Card>
        <LoginButton
          onClick={() => {
            setLoginDialogShow(true);
          }}
        >
          重新登录
        </LoginButton>
      </Card>
      {/* 登录弹窗 */}
      {loginDialogShow && (
        <DialogWindow
          close={() => {
            dialogClose("login");
          }}
        >
          <h1>登录</h1>
        </DialogWindow>
      )}
      {/*更新数据弹窗*/}
      {updateDataDialogShow && (
        <DialogWindow
          close={() => {
            dialogClose("updateData");
          }}
        >
          <h1>更新数据</h1>
        </DialogWindow>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f6;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 2rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  p {
    font-size: 2rem;
    font-weight: bold;
    color: #1d1d1f;
  }
`;

const Card = styled.div`
  border-radius: 12px;
  background-color: #fafafa;
  padding: 1rem;
  min-height: 5rem;
  margin: 2rem 0px 2rem 0px;
  box-shadow: 0px 0px 10px 2px #eeeded;
  li {
    list-style: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  color: #fafafa;
  background-color: #ff8364;
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  /* font-weight: bold; */
  border: 0px;
  &:hover {
    background-color: #4eb8ca;
  }
  transition-duration: 0.2s;
`;

export { Header, Container };
export default MoreView;
