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
  const [dialogShow, setDialogShow] = useState(false);
  let dialogClose = () => {
    setDialogShow(false);
  };
  let card1 = [
    { Icon: InfoIcon, text: "个人信息", to: "/selfInfo" },
    { Icon: ScoreIcon, text: "成绩查询", to: "/selfInfo" },
    { Icon: DownloadForOfflineIcon, text: "更新数据", to: "" },
    { Icon: DateRangeIcon, text: "日期设置", to: "/" },
  ];

  let card2 = [
    { Icon: BusinessIcon, text: "关于我们", to: "/selfInfo" },
    { Icon: PodcastsIcon, text: "用户条款", to: "/selfInfo" },
    { Icon: GppGoodIcon, text: "开源协议", to: "/" },
    { Icon: EmailIcon, text: "联系我们", to: "/" },
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
            setDialogShow(true);
          }}
        >
          重新登录
        </LoginButton>
      </Card>
      {/* 弹窗 */}
      {dialogShow && (
        <DialogWindow close={dialogClose}>
          <h1>登录</h1>
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
  p {
    font-size: 2rem;
    font-weight: bold;
    color: #1d1d1f;
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
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

export default MoreView;
