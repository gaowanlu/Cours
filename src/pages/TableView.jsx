import React from "react";
import styled from "styled-components";
import avatar from "../assets/svg/avatar.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function TableView() {
  return (
    <React.Fragment>
      <Container>
        <Title>
          <TitleHeader>
            <DateText>
              <strong>1</strong> 月 <strong>13</strong> 日 星期{" "}
              <strong>4</strong>
            </DateText>
            <Link to="/selfInfo">
              <Avatar src={avatar} alt="头像" />
            </Link>
          </TitleHeader>
          <div>今日课程</div>
        </Title>
        <Content>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
          <Card>
            <div>上午一 线性代数</div>
            <div>教室 16501</div>
            <div>时间 8:25~9:10</div>
            <div>讲授人 李老师</div>
          </Card>
        </Content>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f6;
  margin-bottom: 4rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1d1d1f;
  height: 5rem;
  padding-left: 1rem;
  padding-top: 1rem;
`;

const TitleHeader = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
`;

const Avatar = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 0.9rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const DateText = styled.div`
  font-size: 0.8rem;
  color: #707070;
  height: 1rem;
  flex: 1;
`;

const Card = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin-bottom: 14px;
  padding: 0.6rem;
  div {
    margin: 0.3rem;
  }
  box-shadow: 0px 0px 10px 2px #f0f0f0;
  /* color:#1d1d1f; */
  font-weight: lighter;
`;

const Content = styled.div`
  padding: 0px 1rem 1rem 1rem;
`;

export { Title, DateText };
export default TableView;
