import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChooseList from "../components/ChooseList";
import DialogWindow from "../components/DialogWindow";
import InfoIcon from "@mui/icons-material/Info";
import ScoreIcon from "@mui/icons-material/Score";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, darkModeChange } from "../features/theme/themeSlice";
import Switch from "@mui/material/Switch";
import store from "../app/store";
import LoginCard from "../components/LoginCard";

function MoreView() {
  const [updateDataDialogShow, setUpdateDataDialogShow] = useState(false); //更新数据弹窗显示状态
  const [checked, setChecked] = React.useState(false); //深色模式开关
  const dispatch = useDispatch();
  //深色模式开关回调
  const handleChange = (event) => {
    setChecked(event.target.checked);
    /*store.theme update*/
    dispatch(darkModeChange()); //深色模式开启
  };

  useEffect(() => {
    /*加载深色模式状态*/
    setChecked(store.getState().theme.darkMode);
  }, []);

  /*获取主题配置*/
  const theme = useSelector(selectTheme);

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
    {
      Icon: DownloadForOfflineIcon,
      text: "更新数据",
      to: "",
      clickCallBack: (e) => {
        e.preventDefault();
        setUpdateDataDialogShow(true);
      },
    },
    { Icon: DateRangeIcon, text: "时间设置", to: "/dateSetting" },
  ];
  /*选择列表2*/
  const card2 = [
    { Icon: BusinessIcon, text: "关于我们", to: "/aboutUs" },
    { Icon: EmailIcon, text: "联系我们", to: "/concatUs" },
  ];

  return (
    <Container
      theme={theme}
      className="animate__animated animate__zoomIn animate__faster"
    >
      {/*头部*/}
      <Header>
        <p>更多</p>
      </Header>
      {/*卡片1*/}
      <Card theme={theme}>
        <ChooseList list={card1} theme={theme} />
      </Card>
      {/*卡片2*/}
      <Card theme={theme}>
        <ChooseList list={card2} theme={theme} />
      </Card>
      {/*卡片3*/}
      <Card theme={theme}>
        {/*深色模式开关*/}
        <DarkSwitchBox>
          <span>深色模式</span>
          <SwitchStyled checked={checked} onChange={handleChange} />
        </DarkSwitchBox>
      </Card>
      {/*更新数据弹窗*/}
      {updateDataDialogShow && (
        <DialogWindow
          theme={theme}
          close={() => {
            dialogClose("updateData");
          }}
        >
          <LoginCard theme={theme} />
        </DialogWindow>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f6;
  color: #1d1d1f;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 2rem;
  ${(props) => {
    return props.theme.color
      ? `
      background-color: ${props.theme.color.background};
      color: ${props.theme.color.color};
  `
      : null;
  }}
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Card = styled.div`
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.frontBackground};
  padding: 1rem;
  margin: 2rem 0px 2rem 0px;
  box-shadow: ${(props) => props.theme.box.boxShadow};
  li {
    list-style: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  color: #fafafa;
  background-color: var(--color-primary);
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  border: 0px;
  transition-duration: 0.2s;
`;

const DarkSwitchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/*重写开关样式*/
const SwitchStyled = styled(Switch)`
  span {
    color: var(--color-primary) !important;
  }
  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked
    + .MuiSwitch-track {
    background-color: var(--color-primary) !important;
  }
  input {
    color: red !important;
  }
`;

export { Header, Container };
export default MoreView;
