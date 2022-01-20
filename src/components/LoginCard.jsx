import React from "react";
import webVpn from "./../api/webVpn";

function LoginCard(props) {
  const clickHandle = (e) => {
    webVpn("", "", () => {});
  };
  return (
    <div>
      <h1>获取数据</h1>
      <button onClick={clickHandle}>发起请求</button>
    </div>
  );
}

export default LoginCard;
