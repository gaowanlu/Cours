import React from "react";
import CourseDetail from "./CourseDetail";
import styled from "styled-components";
/*测试数据*/
const listTest = [
  {
    name: "Error",
    teacher: "",
    room: "",
    courseId: "",
    courseNo: "1",
    exam: "",
  },
  {
    name: "Error",
    teacher: "",
    room: "",
    courseId: "",
    courseNo: "2",
    exam: "",
  }
];

/**
 *
 * @param {list[{name:课程名,teacher:教师,room: 教室,courseId: 课程ID,courseNo: 课号,exam: 考核方式,itemname: 教授内容}]} props
 * @returns
 */
function CourseDetailList(props) {
  const list = props.list ? props.list : listTest;
  return (
    <Container>
      <Title>任务详情</Title>
      {list &&
        list.map((v, i, self) => {
          return <CourseDetail {...v} key={v.courseNo} />;
        })}
    </Container>
  );
}

const Container = styled.div`
  color: var(--color-color);
`;
const Title = styled.p`
  font-size: 1.5rem;
  padding-bottom: 1.7rem;
  font-weight: bold;
`;

export default CourseDetailList;
