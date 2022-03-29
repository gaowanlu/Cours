import React from "react";
import styled from "styled-components";
import GrassIcon from "@mui/icons-material/Grass";

/**
 *
 * @param {name,teacher,room,courseId,courseNo,exam} props
 * @returns
 */
function CourseDetail(props) {
  console.log(props);
  return (
    <Container>
      <GrassIcon
        sx={{
          color: "var(--color-primary)",
          position: "absolute",
          right: "1rem",
          top: "0.6rem",
        }}
      />
      <CourseName>{props.name}</CourseName>
      <ul>
        <Row>教师 {props.teacher}</Row>
        <Row>教室 {props.room}</Row>
        <Row>课程 {props.courseId}</Row>
        <Row>教授内容 {props.itemname}</Row>
        <Row>课号 {props.courseNo}</Row>
        <Row>考核方式 {props.exam}</Row>
      </ul>
    </Container>
  );
}

const Container = styled.section`
  min-height: 5rem;
  position: relative;
  li {
    list-style: none;
  }
  ul {
    margin-bottom: 1rem;
    padding: 0.2rem;
  }
  background: #f8f1efea; /* fallback for old browsers */
  color: #2b2a2a;
  border-radius: 0.8rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: var(--color-background-front);
  color: var(--color-color);
  box-shadow: var(--box-shadow);
`;
const CourseName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.2rem;
  padding-bottom: 0.4rem;
  color: var(--color-primary);
`;
const Row = styled.li`
  padding: 0.4rem 0;
  position: relative;
  min-height: 1.5rem;
  &::after {
    content: "";
    position: absolute;
    left: 2rem;
    right: 0.5rem;
    bottom: 0rem;
    border-bottom: 1px solid #7c7c7c2b;
  }
  font-weight: lighter;
  margin-bottom: 0.5rem;
`;

export default CourseDetail;
