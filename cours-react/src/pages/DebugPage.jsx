import React from "react";
import { Base64 } from "js-base64";
// import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import axios from "axios";
function DebugPage(props) {
  const [userid, setUserid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const submit = async (e) => {
    axios({
      url: "https://linkway.site/token/login",
      method: "POST",
      headers: {
        Authorization: Base64.encode(`Basic ${localStorage.getItem("token")}:`),
      },
      data: { username: "gaownalu", password: "123456" },
    })
      .then((res) => {
        console.log(res.data.token);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((e) => {});
  };
  const getAPI = (e) => {
    axios({
      url: "https://linkway.site/token/get",
      method: "POST",
      headers: {
        Authorization: `Basic ${Base64.encode(
          localStorage.getItem("token") + ":"
        )}`,
      },
    })
      .then((res) => {
        if (res.data.auth) {
          setUserid(res.data.auth.userid);
          setPassword(res.data.auth.password);
        }
      })
      .catch((e) => {});
  };
  return (
    <PageContainer>
      <h1>JWT-TOKEN DEBUG</h1>
      <button onClick={submit}>发起请求获取Token</button>
      <button onClick={getAPI}>获取内容</button>
      <h2>{userid}</h2>
      <h2>{password}</h2>
    </PageContainer>
  );
}

export default DebugPage;
