import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

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

function FetchView() {
  /*列标题*/
  let colTags = [
    { id: 0, style: {}, text: "18周" },
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
  return (
    <React.Fragment>
      <Container>
        <Content>
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
            <CourseBox style={Coordinate.courseBoxStyle(1, 7, 3)}>
              线性代数@16504
            </CourseBox>
          </Card>
        </Content>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const Container = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  background-color: #f2f2f6;
`;
const Content = styled.div`
  padding: 1rem;
`;
const Card = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin-bottom: 14px;
  padding: 0.4rem;
  height: calc(100vh - 7rem);
  overflow: hidden;
  position: relative;
`;
const ColTagBox = styled.div`
  position: absolute;
  width: calc(12.5% - 0.1rem);
  height: 1rem;
  /* background-color: #f2f2f6; */
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  color: #0066cc;
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
  color: #0066cc;
  cursor: pointer;
`;

const CourseBox = styled.div`
  position: absolute;
  width: calc(12.5% - 0.1rem);
  overflow: hidden;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: #0066cc;
  border-radius: 5px;
  padding: 4px;
  font-size: 0.5rem;
  box-sizing: border-box;
  color: #fafafa;
  min-height: calc(10% - 0.14rem);
  cursor: pointer;
`;

export default FetchView;
