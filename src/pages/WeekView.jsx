import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import WeekTable from "../components/WeekTable.tsx";
import DialogWindow from "../components/DialogWindow";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import CourseDetailList from "./../components/CourseDetailList";
import courseBase from "../data/courseBase";

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
  /*获取主题配置*/
  const theme = useSelector(selectTheme);
  let nowWeek = courseBase.nowWeek(); //加载现在是第几周
  let weekCourse = courseBase.weekViewFormat(nowWeek); //获取这一周的课表
  //课程块点击
  const courseItemClickHandle = async (e, item) => {
    setDetailList(detailListCreator(item));
    setDialogShow(true);
  };
  return (
    <React.Fragment>
      <Container
        theme={theme}
        className="animate__animated animate__slideInRight  animate__faster"
      >
        <Content>
          <WeekTable
            courseClick={courseItemClickHandle}
            nowWeek={nowWeek}
            weekCourse={weekCourse}
            theme={theme}
          />
        </Content>
      </Container>
      {/* 弹窗 */}
      {dialogShow && (
        <DialogWindow
          close={() => {
            setDialogShow(false);
          }}
          theme={theme}
        >
          <CourseDetailList theme={theme} list={detailList} />
        </DialogWindow>
      )}
      {/* 底部导航栏 */}
      <Footer fill="week" theme={{ ...theme }} />
    </React.Fragment>
  );
}

const Container = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;
const Content = styled.div`
  padding: 1rem;
`;

export default WeekView;
