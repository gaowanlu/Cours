import React, { useState } from "react";
import webVpn from "./../api/webVpn";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import courseBase from "../data/courseBase";

/**
 * @mui 提示组件
 * @param {*} type success or error
 * @param {*} open false or true
 * @returns
 */
const alertConfig = (type, open) => {
  if (type === "error") {
    return {
      open,
      type,
      title: "更新错误",
      message: `请检查账号密码是否正确 若多次出错请联系开发者 heizuboriyo@gmail.com 最近更新时间 ${new Date().toString()}`,
    };
  } else if (type === "success") {
    return {
      open,
      type,
      title: "更新成功",
      message: `最近更新时间 ${new Date().toString()}`,
    };
  }
};

/**
 * 登录获取数据组件
 * @param {*} props
 * @returns
 */
function LoginCard(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(alertConfig("success", false));

  const clickHandle = (e) => {
    webVpn(username, password, (rp) => {
      //alert("获取数据成功");
      console.log(rp);
      setModalOpen(false); //关闭modal
      //显示alert成功
      if (rp.status === 200 && rp.data.data.e === undefined) {
        setAlertOpen(alertConfig("success", true));
        //更新localStorage
        courseBase.update(rp.data.data);
      } else {
        setAlertOpen(alertConfig("error", true));
      }
    });
    setModalOpen(true);
  };

  //获取输入框内容
  const inputChangeHandle = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value.replace(" ", ""));
        break;
      case "password":
        setPassword(e.target.value.replace(" ", ""));
        break;
    }
  };
  return (
    <div>
      <Title>芜湖起飞</Title>
      <Content>
        <UserNameInput
          required
          name="username"
          label="学号"
          variant="filled"
          size="small"
          onChange={inputChangeHandle}
          defaultValue={username}
        />
        <PasswordInput
          required
          name="password"
          label="密码"
          defaultValue=""
          variant="filled"
          type="password"
          size="small"
          onChange={inputChangeHandle}
          defaultValue={password}
        />
        {/*登录按钮*/}
        <SubmitButton onClick={clickHandle}>起飞</SubmitButton>
        {/*modal*/}
        {modalOpen && <LoginModal theme={props.theme} />}
        {/*alert提示*/}
        {alertOpen.open && (
          <UpdateResultAlert severity={alertOpen.type}>
            <AlertTitle>{alertOpen.title}</AlertTitle>
            {alertOpen.message}
          </UpdateResultAlert>
        )}
      </Content>
    </div>
  );
}

const Content = styled.div`
  margin: 0.5rem;
  margin-top: 2rem;
  padding: 0.5rem;
`;

const UserNameInput = styled(TextField)`
  width: 100%;
  & > .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: var(--color-primary) !important;
  }
  label {
    color: var(--color-primary) !important;
  }
  & input {
    color: var(--color-primary) !important;
    height: 1.5rem;
  }
`;

const PasswordInput = styled(TextField)`
  width: 100%;
  margin-top: 1rem !important;
  & > .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: var(--color-primary) !important;
  }
  label {
    color: var(--color-primary) !important;
  }
  & input {
    color: var(--color-primary) !important;
    height: 1.5rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: var(--color-primary) !important;
  color: #fafafa !important;
  /* margin: 0.5rem !important; */
  margin-top: 1rem !important;
  height: 3rem;
  border-radius: 1.5rem !important;
`;

const UpdateResultAlert = styled(Alert)`
  margin-top: 2rem;
`;

export default LoginCard;
