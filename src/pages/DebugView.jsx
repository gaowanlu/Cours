import React from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import courseBase from "./../data/courseBase";
import styled from "styled-components";
import stringHashRGB from "./../utils/stringHashRGB.ts";

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
        title="考试安排"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title="考试安排" size={0} />
        <Header title="待办" size={1} />
        <Scroll>
          <Item theme={theme} background={stringHashRGB("线性代数")}>
            <CourseName>线性代数</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("数据结构与算法")}>
            <CourseName>数据结构与算法</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("机器学习")}>
            <CourseName>机器学习</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("高等数学")}>
            <CourseName>高等数学</CourseName>
            <ExamTime>2022年1月3日</ExamTime>
            <ExamLocation>教室 16203*</ExamLocation>
            <DeadLine>1天</DeadLine>
            <ItemFooter></ItemFooter>
          </Item>
        </Scroll>
        <Header title="已完成" size={1} />
        <Scroll>
          <Item theme={theme} background={stringHashRGB("线性代数")}>
            <CourseName>线性代数</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("概率论与数理统计")}>
            <CourseName>概率论与数理统计</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("高等数学")}>
            <CourseName>高等数学</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("数据结构与算法")}>
            <CourseName>数据结构与算法</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("线性代数")}>
            <CourseName>线性代数</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("概率论与数理统计")}>
            <CourseName>概率论与数理统计</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("高等数学")}>
            <CourseName>高等数学</CourseName>
            <ItemFooter></ItemFooter>
          </Item>
          <Item theme={theme} background={stringHashRGB("数据结构与算法")}>
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
  /* &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 3px;
    &:hover {
      background: #3b76b1;
    }
  } */
  margin-bottom: 3rem;
  position: relative;
  padding-top: 0.7rem;
  padding-bottom: 1.5rem;
  @media screen and (min-width: 1000px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 999px) {
    &::-webkit-scrollbar {
      height: 0px;
    }
  }
`;

const Item = styled.section`
  width: 14rem;
  height: 16rem;
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
    transform: scale(1.05);
    transition: transform 200ms ease-in-out;
  }
  position: relative;
  @media screen and (min-width: 1000px) {
    margin-top: 1rem;
  }
  background-color: ${(props) =>
    `rgba(${props.background[0]},${props.background[1]},${props.background[2]},70%);`};
  color: #fafafa;
  background: radial-gradient(
      ellipse at top,
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
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  line-height: 5rem;
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
    #1f1f1f1c,
    #2e2e2e22
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export default DebugView;
