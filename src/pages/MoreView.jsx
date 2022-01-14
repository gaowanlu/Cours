import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ChooseList from "../components/ChooseList";

function MoreView() {
  return (
    <Container className="animate__animated animate__bounceInUp">
      <Header>
        <p>更多</p>
      </Header>
      <Card>
        <ChooseList />
      </Card>
      <Card>
        <ul>
          <li>
            <h2>关于我们</h2>
          </li>
          <li>
            <h2>用户条款</h2>
          </li>
          <li>
            <h2>开源协议</h2>
          </li>
          <li>
            <h2>联系我们</h2>
          </li>
        </ul>
      </Card>
      <Card>
        <ul>
          <li>
            <h2>登录</h2>
          </li>
        </ul>
      </Card>
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

export default MoreView;
