import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import courseBase from "../data/courseBase";
import styled from "styled-components";
import stringHashRGB from "./../utils/stringHashRGB.ts";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

/**
 * 考试卡片组件
 * @param {info} props
 * @returns
 */
function ExamCard({ info, deadline }) {
  let { croomno, cname } = info;
  let { day, year, month } = info.date;
  let { start, end } = info.date.time;
  if (String(start.minute).length < 2)
    start.minute = "0" + start.minute.toString();
  if (String(end.minute).length < 2) end.minute = "0" + end.minute.toString();
  return (
    <Item background={stringHashRGB(cname)}>
      <CourseName>{cname}</CourseName>
      <ExamTime>
        {year}年{month}月{day}日
      </ExamTime>
      <ExamLocation>
        教室 {croomno} {start.hours}:{start.minute} - {end.hours}:{end.minute}
      </ExamLocation>
      {deadline && (
        <DeadLine>
          {((info.date.obj - new Date()) / 86400000).toFixed(1)} 天
        </DeadLine>
      )}
      <ItemFooter></ItemFooter>
    </Item>
  );
}

/**
 * 组件调试界面
 * @returns
 */
function ExamPage(props) {
  const examList = courseBase.examList().data;
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="考试安排" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title="考试安排" size={0} />
        <PageHeader
          title={`待办 ${examList.todo.length}`}
          size={1}
          color="var(--color-primary)"
        />
        <Scroll>
          {examList.todo.map((o) => {
            return (
              <ExamCard key={o.courseid + o.croomno} info={o} deadline={true} />
            );
          })}
        </Scroll>
        <PageHeader
          title={`已完成 ${examList.ok.length}`}
          size={1}
          color="var(--color-primary)"
        />
        <Scroll>
          {examList.ok.map((o) => {
            return <ExamCard key={o.courseid + o.croomno} info={o} />;
          })}
        </Scroll>
      </PageContainer>
    </React.Fragment>
  );
}

const Scroll = styled.div`
  width: 100%;
  /* height: 500px; */
  /* background-color: red; */
  overflow-x: auto;
  display: flex;
  justify-content: flex-start;
  scroll-snap-type: x mandatory;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  padding-top: 0.7rem;
  padding-bottom: 1.5rem;
  box-sizing: border-box;
  @media screen and (min-width: 1000px) {
    flex-wrap: wrap;
    padding-left: 0.6rem;
  }
  &::-webkit-scrollbar {
    height: 0px;
  }
  scrollbar-width: none;
`;

const Item = styled.section`
  min-width: 14rem;
  height: 16rem;
  max-width: 50%;
  background-color: var(--color-background-front);
  flex: 1;
  border-radius: 1rem;
  scroll-snap-align: start;
  padding: 1rem;
  /* margin: 0rem 1rem; */
  margin-right: 1rem;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  &:hover {
    transform: translateY(-0.7rem);
    transition: transform 200ms ease-in-out;
  }
  position: relative;
  @media screen and (min-width: 1000px) {
    margin-top: 1rem;
    min-height: 15vw;
  }
  background-color: ${(props) =>
    `rgba(${props.background[0]},${props.background[1]},${props.background[2]},70%);`};
  color: #fafafa;
  background: radial-gradient(
      circle at top,
      ${(props) =>
        `rgba(${props.background[0]},${props.background[1]},${props.background[2]},70%)`},
      transparent
    ),
    radial-gradient(ellipse at bottom, var(--color-primary), transparent);
`;

const CourseName = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  /* color: #ad9b9b;
  color: var(--color-primary); */
`;

const ExamTime = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  line-height: 2rem;
`;

const DeadLine = styled.p`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 5rem;
`;

const ExamLocation = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 3rem;
`;

const ItemFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: 3rem;
  background-color: var(--color-primary);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background: #f12711; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1f1f1f47,
    #2e2e2e40
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export default ExamPage;
