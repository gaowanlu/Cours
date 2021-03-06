import React, { useState } from "react";
import styled from "styled-components";
import WeekTable from "../components/WeekTable.jsx";
import DialogWindow from "../components/DialogWindow";
import CourseDetailList from "../components/CourseDetailList";
import courseBase from "../data/courseBase";
import TigerSelectNum from "./../components/TigerSelectNum";

//课程详情数据格式转换
const detailListCreator = (courseItem) => {
  const list = [];
  for (const course of courseItem.obj) {
    list.push({
      name: course.cname,
      teacher: course.name,
      room: course.croomno,
      courseId: course.courseid,
      courseNo: course.courseno,
      exam: course.examt,
      itemname:course.itemname
    });
  }
  return list;
};

/**
 * 周课表页面
 * @returns
 */
function WeekView() {
  const [dialogShow, setDialogShow] = useState(false);
  const [detailList, setDetailList] = useState([]);
  const [nowWeek, setNowWeek] = useState(courseBase.nowWeek()); //加载现在是第几周
  const [weekCourse, setWeekCourse] = useState(
    courseBase.weekViewFormat(nowWeek)
  ); //获取这一周的课表
  //课程块点击
  const courseItemClickHandle = async (e, item) => {
    setDetailList(detailListCreator(item));
    setDialogShow(true);
  };
  React.useEffect(() => {
    setWeekCourse(courseBase.weekViewFormat(nowWeek));
  }, [nowWeek]);
  return (
    <React.Fragment>
      <Container className="animate__animated animate__slideInRight  animate__faster">
        <Content>
          <WeekTable
            courseClick={courseItemClickHandle}
            nowWeek={nowWeek}
            weekCourse={weekCourse}
          />
        </Content>
      </Container>
      <TigerSelectNum setNowIndex={setNowWeek} left={"0rem"} bottom={"50vh"} />
      {/* 弹窗 */}
      {dialogShow && (
        <DialogWindow
          close={() => {
            setDialogShow(false);
          }}
        >
          <CourseDetailList list={detailList} />
        </DialogWindow>
      )}
    </React.Fragment>
  );
}

const Container = styled.div`
  /* width: 100vw; */
  height: calc(100vh - 4rem);
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const Content = styled.div`
  padding: 1rem;
`;

export default WeekView;
