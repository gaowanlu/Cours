import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChooseList from "../components/ChooseList";
import DialogWindow from "../components/DialogWindow";
import InfoIcon from "@mui/icons-material/Info";
import ScoreIcon from "@mui/icons-material/Score";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";
import { useDispatch } from "react-redux";
import { themeChange } from "../features/theme/themeSlice";
import store from "../app/store";
import LoginCard from "../components/LoginCard";
import SwitchCard from "../components/SwitchCard";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import PageNavigationBar from "../components/PageNavigationBar";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

function MoreView() {
  const [updateDataDialogShow, setUpdateDataDialogShow] = useState(false); //更新数据弹窗显示状态
  const [checked, setChecked] = React.useState(false); //深色模式开关
  const dispatch = useDispatch();
  //深色模式开关回调
  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(themeChange()); //模式切换
  };

  useEffect(() => {
    /*加载深色模式状态*/
    setChecked(store.getState().theme.theme_name === "dark"); //加载现在是否为深色模式
  }, []);

  /*弹窗关闭回调*/
  const dialogClose = (name) => {
    switch (name) {
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
    { Icon: AssignmentTurnedInIcon, text: "考试安排", to: "/exam" },
    { Icon: ChatIcon, text: "信使服务", to: "/talk" },
  ];
  /*选择列表2*/
  const card2 = [
    {
      Icon: DownloadForOfflineIcon,
      text: "更新数据",
      to: "",
      clickCallBack: (e) => {
        e.preventDefault();
        setUpdateDataDialogShow(true); //弹出登陆更新卡片
      },
    },
    { Icon: DateRangeIcon, text: "时间设置", to: "/dateSetting" },
    { Icon: BusinessIcon, text: "关于我们", to: "/aboutUs" },
  ];

  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="更多" backTitle="日课表" backPath="/" />
      <PageContainer className="animate__animated animate__zoomIn animate__faster">
        {/*头部*/}
        <PageHeader title={"更多"} />
        {/*卡片1*/}
        <Card>
          <ChooseList list={card1} />
        </Card>
        {/*卡片2*/}
        <Card>
          <ChooseList list={card2} />
        </Card>
        {/*卡片3*/}
        <SwitchCard
          checked={checked}
          onChange={handleChange}
          title="深色模式"
        />
        {/*更新数据弹窗*/}
        {updateDataDialogShow && (
          <DialogWindow
            close={() => {
              dialogClose("updateData");
            }}
          >
            <LoginCard />
          </DialogWindow>
        )}
      </PageContainer>
    </React.Fragment>
  );
}

const Card = styled.div`
  border-radius: 12px;
  background-color: var(--color-background-front);
  padding: 1rem;
  margin: 2rem 0px 2rem 0px;
  box-shadow: var(--box-shadow);
  li {
    list-style: none;
  }
`;

const Container = PageContainer;
const Header = PageHeader;

export { Header, Container };
export default MoreView;
