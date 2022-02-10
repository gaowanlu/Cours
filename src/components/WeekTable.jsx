import React from "react";
import styled from "styled-components";
import randomBackground from "../utils/randomBackground";

/*课程表Card绝对定位 坐标系 坐标定位*/
const Coordinate = {
  top(y) {
    return { top: `calc((10% - 0.14rem) * ${y} + 1.4rem)` };
  },
  left(x) {
    return { left: `calc((12.5% - 0.1rem) * ${x})` };
  },
  topLeft(x, y) {
    return { ...this.top(y), ...this.left(x) };
  },
  courseBoxStyle(x, y, h) {
    return {
      ...this.top(y),
      ...this.left(x),
      height: `calc((10% - 0.14rem) * ${h})`,
    };
  },
};

/**
 *
 * @param {courseClick:call back function} props
 * @returns
 */
function WeekTable(props) {
  const { nowWeek, weekCourse } = props;
  // let nowWeek = courseBase.nowWeek();//加载现在是第几周
  // let weekCourse = courseBase.weekViewFormat(nowWeek);//获取这一周的课表
  /*列标题*/
  let colTags = [
    { id: 0, style: {}, text: `${nowWeek}周` },
    { id: 1, style: Coordinate.left(1), text: "周一" },
    { id: 2, style: Coordinate.left(2), text: "周二" },
    { id: 3, style: Coordinate.left(3), text: "周三" },
    { id: 4, style: Coordinate.left(4), text: "周四" },
    { id: 5, style: Coordinate.left(5), text: "周五" },
    { id: 6, style: Coordinate.left(6), text: "周六" },
    { id: 7, style: Coordinate.left(7), text: "周日" },
  ];
  /*行标题*/
  let rowTags = [
    { id: 0, style: Coordinate.top(0), text: "1" },
    { id: 1, style: Coordinate.top(1), text: "2" },
    { id: 2, style: Coordinate.top(2), text: "3" },
    { id: 3, style: Coordinate.top(3), text: "4" },
    { id: 4, style: Coordinate.top(4), text: "5" },
    { id: 5, style: Coordinate.top(5), text: "6" },
    { id: 6, style: Coordinate.top(6), text: "7" },
    { id: 7, style: Coordinate.top(7), text: "8" },
    { id: 8, style: Coordinate.top(8), text: "9" },
    { id: 9, style: Coordinate.top(9), text: "10" },
  ];
  /*课程块点击*/
  const courseClick = (e, item) => {
    props.courseClick(e, item);
  };
  return (
    <Card>
      {colTags.map((item) => {
        return (
          <ColTagBox style={item.style} key={item.id}>
            {item.text}
          </ColTagBox>
        );
      })}

      {rowTags.map((item) => {
        return (
          <RowTagBox key={item.id} style={item.style}>
            {item.text}
          </RowTagBox>
        );
      })}

      {weekCourse.map((item, index) => {
        return (
          <CourseBox
            bg1={randomBackground()[0]}
            bg2={randomBackground()[1]}
            key={index}
            style={Coordinate.courseBoxStyle(item.x, item.y * 2, 2)}
            onClick={(e) => courseClick(e, item)}
          >
            <p>{item.text}</p>
          </CourseBox>
        );
      })}
    </Card>
  );
}

const Card = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin-bottom: 14px;
  padding: 0.4rem;
  height: calc(100vh - 7rem);
  overflow: hidden;
  position: relative;
  background-color: var(--color-background-front);
`;
const ColTagBox = styled.div`
  position: absolute;
  width: calc(12.5% - 0.1rem);
  height: 1rem;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  color: var(--color-primary);
  font-size: 0.7rem;
  cursor: pointer;
`;

const RowTagBox = styled.div`
  position: absolute;
  width: calc(12.5% - 0.1rem);
  height: calc(10% - 0.14rem);
  font-size: 0.7rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
  cursor: pointer;
`;

const CourseBox = styled.div`
  position: absolute;
  width: calc(12.5% - 0.1rem);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d1eeff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    ${(props) => props.bg1},
    ${(props) => props.bg2}
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    ${(props) => props.bg1},
    ${(props) => props.bg2}
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border-radius: 10px;
  padding: 6px;
  font-size: 0.7rem;
  box-sizing: border-box;
  color: #464646;
  min-height: calc(10% - 0.14rem);
  cursor: pointer;
  flex-wrap: wrap;
  -webkit-box-sizing: border-box;
  word-break: break-all;
  word-wrap: break-word;
  &:hover {
    background: #e7f1f8;
  }
`;

export default WeekTable;
