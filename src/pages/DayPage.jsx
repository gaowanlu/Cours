import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import courseBase from "../data/courseBase";
import PlanCard from "../components/PlanCard";
import Footer from "../components/Footer";
import Fade from "react-reveal/Fade";
import MoreIcon from "@mui/icons-material/More";
import Tooltip from "@mui/material/Tooltip";
import PageContainer from "../components/PageContainer";

function DayPage() {
  /*获取日课表数据*/
  let dayCourses = courseBase.dayViewFormat();

  return (
    <React.Fragment>
      <PageContainer className="animate__animated animate__slideInLeft animate__faster">
        <Title>
          <TitleHeader>
            <DateText>
              <strong>{courseBase.nowTime().toString()}</strong>
            </DateText>
            <Link to="/more">
              <Tooltip title="更多" placement="left">
                <More />
              </Tooltip>
            </Link>
          </TitleHeader>
          <div>今日课程</div>
        </Title>

        <Content>
          {dayCourses.map((item, index) => {
            return (
              <Fade bottom key={index}>
                <PlanCard {...item} />
              </Fade>
            ); //key这样写是错误的 但对于此情况 没有关系 无忧状态关联
          })}
        </Content>
      </PageContainer>
      {/* 底部导航栏 */}
      <Footer fill="table" />
    </React.Fragment>
  );
}

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-color);
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

const More = styled(MoreIcon)`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  cursor: pointer;
  margin-right: 1rem;
  color: var(--color-primary);
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
export default DayPage;
