import React from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import courseBase from "./../data/courseBase";
import styled from "styled-components";

/**
 * 组件调试界面
 * @returns
 */
function DebugView(props) {
  const theme = useSelector(selectTheme);
  const examList = courseBase.examList().data;
  console.log(examList);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="调试"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title="考试安排" size={0} />
        <Header title="共4项任务" size={1} />
        <Scroll>
          <Item theme={theme}>
            <CourseName>线性代数</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>数据结构与算法</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>机器学习</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>高等数学</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
        </Scroll>
        <Header title="已完成" size={1} />
        <Scroll>
          <Item theme={theme}>
            <CourseName>线性代数</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>概率论与数理统计</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>高等数学</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>数据结构与算法</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>线性代数</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>概率论与数理统计</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>高等数学</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme}>
            <CourseName>数据结构与算法</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
        </Scroll>
      </Container>
    </React.Fragment>
  );
}

const Scroll = styled.div`
  width: 100%;
  /* height: 500px; */
  /* background-color: red; */
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  align-items: center;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 3px;
    &:hover {
      background: #3b76b1;
    }
  }
  margin-bottom: 3rem;
  position: relative;
  left: -0.3rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  /* flex-wrap: wrap; */
`;

const Item = styled.section`
  width: 16rem;
  height: 300px;
  max-width: 80%;
  background-color: ${(props) => props.theme.color.frontBackground};
  flex: none;
  border-radius: 1rem;
  scroll-snap-align: start;
  padding: 1rem;
  margin: 0rem 1rem;
  box-shadow: ${(props) => props.theme.box.boxShadow};
  cursor: pointer;
  &:hover {
    transform: scale(1.05) rotate(-5deg);
    transition: transform 200ms ease-in;
  }
  position: relative;
`;

const CourseName = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  color: #ad9b9b;
  color: var(--color-primary);
`;

const ExamTime = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  line-height: 2rem;
`;
const DeadLine = styled.p`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  line-height: 8rem;
`;

const ExamLocation = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 3rem;
`;

const ItemFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: 4rem;
  background-color: #52515128;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

export default DebugView;
