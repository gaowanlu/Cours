import React from "react";
import styled from "styled-components";
import avatar from "../assets/svg/avatar.svg";
import { Link } from "react-router-dom";
import courseBase from "../data/courseBase";
import PlanCard from "../components/PlanCard";
import Footer from "../components/Footer";
import SettingsIcon from "@mui/icons-material/Settings";

function DayView() {
  let dayCourses = courseBase.dayViewFormat();
  console.log(dayCourses);
  return (
    <React.Fragment>
      <Container className="animate__animated animate__slideInLeft animate__faster">
        <Title>
          <TitleHeader>
            <DateText>
              <strong>{courseBase.nowTime().toString()}</strong>
            </DateText>
            <Link to="/more">
              <Setting />
            </Link>
          </TitleHeader>
          <div>今日课程</div>
        </Title>
        <Content>
          {dayCourses.map((item, index) => {
            return <PlanCard {...item} key={index} />; //key这样写是错误的 但对于此情况 没有关系 无忧状态关联
          })}
        </Content>
      </Container>
      <Footer fill="table" />
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
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const TitleHeader = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
`;

const Setting = styled(SettingsIcon)`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 0.9rem;
  cursor: pointer;
  margin-right: 1rem;
  color: #0066cc;
`;

const DateText = styled.div`
  font-size: 0.8rem;
  color: #707070;
  height: 1rem;
  flex: 1;
`;

const Content = styled.div`
  padding: 0px 1rem 1rem 1rem;
`;

export { Title, DateText };
export default DayView;
